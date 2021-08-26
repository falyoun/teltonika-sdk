import { BaseCodec } from '../../base-codec';
import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '@app/utils';
import { Codec8IoElements, tcpCFDDSPacketBody } from '@app/codecs';


export class Codec8 extends BaseCodec {
  private readonly _gpsPrecision: any;
  constructor(reader: any, codecType) {
    super(reader, codecType);
    this._gpsPrecision = 10000000;
  }
  private _parseIoElements() {
    let ioElement = [];
    let ioCountInt8 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt8; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(1));
      let value = convertBytesToInt(this.reader.readBytes(1));
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }


    let ioCountInt16 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt16; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(1));
      let value = this.reader.readInt16();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    let ioCountInt32 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt32; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(1));
      let value = this.reader.readInt32();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));

    }


    let ioCountInt64 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt64; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(1));
      let value = this.reader.readDouble();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    return ioElement;
  }

  decodeBody(): void {
    const body = this.tcpTeltonikaPacket.body as tcpCFDDSPacketBody[];
    for (let i = 0; i < this.tcpTeltonikaPacket.header.numberOfRecords1; i++) {
      let avlRecord = {
        timestamp: new Date(convertBytesToInt(this.reader.readBytes(8))),
        priority: convertBytesToInt(this.reader.readBytes(1)),
        gps: {
          longitude: this.reader.readInt32(),
          latitude: this.reader.readInt32(),
          altitude: this.reader.readInt16(),
          angle: this.reader.readInt16(),
          satellites: this.reader.readInt8(),
          speed: this.reader.readInt16(),
        },
        event_id: convertBytesToInt(this.reader.readBytes(1)),
        properties_count: convertBytesToInt(this.reader.readBytes(1)),
        ioElements: [],
      } as tcpCFDDSPacketBody;
      avlRecord = sanitizeGPS(avlRecord, this._gpsPrecision)
      avlRecord.ioElements = this._parseIoElements();
      body.push(avlRecord);
    }
    this.tcpTeltonikaPacket.body = body;
  }
}