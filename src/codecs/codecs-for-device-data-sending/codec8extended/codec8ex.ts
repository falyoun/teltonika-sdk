import { Codec8extendedIoElements, tcpCFDDSPacketBody } from '@app/codecs';
import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '@app/utils';
import { BaseCodec } from '../../base-codec';
export class Codec8ex extends BaseCodec {
  _gpsPrecision: any;
  constructor(reader, codecType) {
    super(reader, codecType);
    this._gpsPrecision = 10000000;
  }

  decodeBody() {
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
        event_id: convertBytesToInt(this.reader.readBytes(2)),
        properties_count: convertBytesToInt(this.reader.readBytes(2)),
        ioElements: [],
      } as tcpCFDDSPacketBody;
      avlRecord = sanitizeGPS(avlRecord, this._gpsPrecision);
      avlRecord.ioElements = this._parseIoElements();
      body.push(avlRecord);
    }

    this.tcpTeltonikaPacket.body = body;
  }
  private _parseIoElements() {
    const ioElement = [];

    // 1 byte
    (() => {
      const ioCountInt8 = convertBytesToInt(this.reader.readBytes(2));
      for (let i = 0; i < ioCountInt8; i++) {
        const property_id = convertBytesToInt(this.reader.readBytes(2));
        const value = convertBytesToInt(this.reader.readBytes(1));
        ioElement.push(
          prepareIOEntity(property_id, value, Codec8extendedIoElements),
        );
      }
    })();

    // 2 byte
    (() => {
      const ioCountInt16 = convertBytesToInt(this.reader.readBytes(2));
      for (let i = 0; i < ioCountInt16; i++) {
        const property_id = convertBytesToInt(this.reader.readBytes(2));
        const value = this.reader.readInt16();
        ioElement.push(
          prepareIOEntity(property_id, value, Codec8extendedIoElements),
        );
      }
    })();

    // 4 byte
    (() => {
      const ioCountInt32 = convertBytesToInt(this.reader.readBytes(2));
      for (let i = 0; i < ioCountInt32; i++) {
        const property_id = convertBytesToInt(this.reader.readBytes(2));
        const value = this.reader.readInt32();
        ioElement.push(
          prepareIOEntity(property_id, value, Codec8extendedIoElements),
        );
      }
    })();

    // 8 byte
    (() => {
      const ioCountInt64 = convertBytesToInt(this.reader.readBytes(2));
      for (let i = 0; i < ioCountInt64; i++) {
        const property_id = convertBytesToInt(this.reader.readBytes(2));
        const value = this.reader.readDouble();
        ioElement.push(
          prepareIOEntity(property_id, value, Codec8extendedIoElements),
        );
      }
    })();

    // x byte
    (() => {
      const ioCountIntX = convertBytesToInt(this.reader.readBytes(2));
      for (let i = 0; i < ioCountIntX; i++) {
        const property_id = convertBytesToInt(this.reader.readBytes(2));
        const ioValueLength = convertBytesToInt(this.reader.readBytes(2));
        const value = (this as any).toString(
          this.reader.readBytes(ioValueLength),
        );
        ioElement.push(
          prepareIOEntity(property_id, value, Codec8extendedIoElements),
        );
      }
    })();
    return ioElement;
  }
}
