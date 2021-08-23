
import { Codec } from '../../codec';
import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '../../../utils';
import { Codec8IoElements } from './codec8-io-elements';

export class Codec8 extends Codec {

  private readonly _gpsPrecision: any;

  static get ODOMETER_PROPERTY_ID() {
    return 16;
  }

  constructor(reader: any, number_of_records: number) {
    super(reader, number_of_records);
    this._gpsPrecision = 10000000;
  }

  parseHeader() {
    this.avlObj.records = [];
    for (let i = 0; i < this.number_of_records; i++) {
      this.parseAvlRecords();
    }
  }

  parseAvlRecords() {
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
      event_id: convertBytesToInt(this.reader.ReadBytes(1)),
      properties_count: convertBytesToInt(this.reader.ReadBytes(1)),
      ioElements: [],
    };
    avlRecord = sanitizeGPS(avlRecord, this._gpsPrecision)
    avlRecord.ioElements = this.parseIoElements();
    this.avlObj.records.push(avlRecord);
  }

  parseIoElements() {
    let ioElement = [];
    let ioCountInt8 = convertBytesToInt(this.reader.ReadBytes(1));
    for (let i = 0; i < ioCountInt8; i++) {
      let property_id = convertBytesToInt(this.reader.ReadBytes(1));
      let value = convertBytesToInt(this.reader.ReadBytes(1));
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }


    let ioCountInt16 = convertBytesToInt(this.reader.ReadBytes(1));
    for (let i = 0; i < ioCountInt16; i++) {
      let property_id = convertBytesToInt(this.reader.ReadBytes(1));
      let value = this.reader.ReadInt16();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    let ioCountInt32 = convertBytesToInt(this.reader.ReadBytes(1));
    for (let i = 0; i < ioCountInt32; i++) {
      let property_id = convertBytesToInt(this.reader.ReadBytes(1));
      let value = this.reader.ReadInt32();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));

    }


    let ioCountInt64 = convertBytesToInt(this.reader.ReadBytes(1));
    for (let i = 0; i < ioCountInt64; i++) {
      let property_id = convertBytesToInt(this.reader.ReadBytes(1));
      let value = this.reader.ReadDouble();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    return ioElement;
  }
}