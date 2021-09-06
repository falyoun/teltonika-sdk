import { Codec8extendedIoElements, TcpCFDDSPacketBody } from '@app/codecs';
import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '@app/utils';
import { DdsBaseClass } from '../dds-base-class';
export class Codec8ex extends DdsBaseClass {
  _gpsPrecision: any;
  constructor(reader) {
    super(reader);
    this._gpsPrecision = 10000000;
  }

  decodeAvlPacket() {
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
        event_id: convertBytesToInt(this.reader.readBytes(2)),
        properties_count: convertBytesToInt(this.reader.readBytes(2)),
        ioElements: [],
      } as any;
      avlRecord = sanitizeGPS(avlRecord, this._gpsPrecision);
      avlRecord.ioElements = this._parseIoElements();
      body.push(avlRecord);
    }
    return body;
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
