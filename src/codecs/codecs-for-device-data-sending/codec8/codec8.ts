import { DdsBaseClass } from '../dds-base-class';
import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '@app/utils';
import { Codec8IoElements, TcpCFDDSPacketBody } from '@app/codecs';

export class Codec8 extends DdsBaseClass {
  private readonly _gpsPrecision: any;
  constructor(reader: any) {
    super(reader);
    this._gpsPrecision = 10000000;
  }
  private _parseIoElements() {
    const ioElement = [];
    const ioCountInt8 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt8; i++) {
      const property_id = convertBytesToInt(this.reader.readBytes(1));
      const value = convertBytesToInt(this.reader.readBytes(1));
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    const ioCountInt16 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt16; i++) {
      const property_id = convertBytesToInt(this.reader.readBytes(1));
      const value = this.reader.readInt16();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    const ioCountInt32 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt32; i++) {
      const property_id = convertBytesToInt(this.reader.readBytes(1));
      const value = this.reader.readInt32();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    const ioCountInt64 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt64; i++) {
      const property_id = convertBytesToInt(this.reader.readBytes(1));
      const value = this.reader.readDouble();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    return ioElement;
  }

  decodeAvlPacket(): Array<TcpCFDDSPacketBody> {
    const numberOfRecords1 = convertBytesToInt(this.reader.readBytes(1));
    const body = [] as TcpCFDDSPacketBody[];
    for (let i = 0; i < numberOfRecords1; i++) {
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
      } as any;
      avlRecord = sanitizeGPS(avlRecord, this._gpsPrecision);
      avlRecord.ioElements = this._parseIoElements();
      body.push(avlRecord);
    }
    // console.log(this.reader.readBytes(1));
    return body;
  }
}
