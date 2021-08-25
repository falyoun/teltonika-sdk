import { Codec8extendedIoElements } from '@app/codecs';
import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '@app/utils';
import { BaseCfdds } from '../base-cfdds';
export class Codec8ex extends BaseCfdds {
  _gpsPrecision: any;
  constructor(reader) {
    super(reader);
    this._gpsPrecision = 10000000;
  }

  decodeBody() {
    this.avl.records = [];
    for (let i = 0; i < this.avl.number_of_data; i++) {
      let avlRecord = {
        timestamp: new Date(convertBytesToInt(this.reader.ReadBytes(8))),
        priority: convertBytesToInt(this.reader.ReadBytes(1)),
        gps: {
          longitude: this.reader.ReadInt32(),
          latitude: this.reader.ReadInt32(),
          altitude: this.reader.ReadInt16(),
          angle: this.reader.ReadInt16(),
          satellites: this.reader.ReadInt8(),
          speed: this.reader.ReadInt16(),
        },
        event_id: convertBytesToInt(this.reader.ReadBytes(2)),
        properties_count: convertBytesToInt(this.reader.ReadBytes(2)),
        ioElements: [],
      };
      avlRecord = sanitizeGPS(avlRecord, this._gpsPrecision);
      avlRecord.ioElements = this._parseIoElements();
      this.avl.records.push(avlRecord);
    }
  }
  private _parseIoElements() {
    let ioElement = [];

    // 1 byte
    (() => {
      let ioCountInt8 = convertBytesToInt(this.reader.ReadBytes(2));
      for (let i = 0; i < ioCountInt8; i++) {
        let property_id = convertBytesToInt(this.reader.ReadBytes(2));
        let value = convertBytesToInt(this.reader.ReadBytes(1));
        ioElement.push(prepareIOEntity(property_id, value, Codec8extendedIoElements));
      }
    })();

    // 2 byte
    (() => {
      let ioCountInt16 = convertBytesToInt(this.reader.ReadBytes(2));
      for (let i = 0; i < ioCountInt16; i++) {
        let property_id = convertBytesToInt(this.reader.ReadBytes(2));
        let value = this.reader.ReadInt16();
        ioElement.push(prepareIOEntity(property_id, value, Codec8extendedIoElements));
      }
    })();


    // 4 byte
    (() => {
      let ioCountInt32 = convertBytesToInt(this.reader.ReadBytes(2));
      for (let i = 0; i < ioCountInt32; i++) {
        let property_id = convertBytesToInt(this.reader.ReadBytes(2));
        let value = this.reader.ReadInt32();
        ioElement.push(prepareIOEntity(property_id, value, Codec8extendedIoElements));
      }
    })();

    // 8 byte
    (() => {
      let ioCountInt64 = convertBytesToInt(this.reader.ReadBytes(2));
      for (let i = 0; i < ioCountInt64; i++) {
        let property_id = convertBytesToInt(this.reader.ReadBytes(2));
        let value = this.reader.ReadDouble();
        ioElement.push(prepareIOEntity(property_id, value, Codec8extendedIoElements));
      }
    })();

    // x byte
    (() => {
      let ioCountIntX = convertBytesToInt(this.reader.ReadBytes(2));
      for (let i = 0; i < ioCountIntX; i++) {
        let property_id = convertBytesToInt(this.reader.ReadBytes(2));
        let ioValueLength = convertBytesToInt(this.reader.ReadBytes(2));
        let value = (this as any).toString(this.reader.ReadBytes(ioValueLength));
        ioElement.push(prepareIOEntity(property_id, value, Codec8extendedIoElements));
      }
    })();
    return ioElement;
  }

}
