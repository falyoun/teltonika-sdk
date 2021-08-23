/**
 * Codec12 is the original and main Teltonika protocol for device-server communication over GPRS messages.
 * Codec12 GPRS commands can be used for sending configuration, debug, digital outputs control commands or other (special purpose command on special firmware versions).
 * This protocol is also necessary for using FMB630/FM6300/FM5300/FM5500/FM4200 features like: Garmin, LCD communication, COM TCP Link Mode.
 */
import { Codec } from '../../codec';
import { convertBytesToInt, sanitizeGPS, sanitizeLongLat } from '../../../utils';
import { AvlRecord, GpsElement } from '../../../models';

export class Codec12 extends Codec {

  constructor(reader, number_of_records: number) {
    super(reader, number_of_records);
  }

  parseHeader() {
    this.avlObj.records = [];
    for (let i = 0; i < this.number_of_records; i++) {
      this.parseAvlRecords();
    }
  }

  parseAvlRecords() {
    // const timestamp = new Date(convertBytesToInt(this.reader.ReadBytes(8)));
    // const priority = convertBytesToInt(this.reader.ReadBytes(1));
    //
    //
    // const longitude = this.reader.ReadInt32();
    // const latitude = this.reader.ReadInt32();
    // const altitude = this.reader.ReadInt16();
    // const angle = this.reader.ReadInt16();
    // const satellites = this.reader.ReadInt8();
    // const speed = this.reader.ReadInt16();
    //
    //
    // const gpsElement = new GpsElement(
    //   longitude,
    //   latitude,
    //   altitude,
    //   angle,
    //   satellites,
    //   speed
    // );
    //
    // const avlRecord = sanitizeLongLat(gpsElement);
    // gpsElement.latitude = avlRecord.gps.latitude;
    // gpsElement.longitude = avlRecord.gps.longitude;
    //
    //
    //
    // return new AvlRecord(priority, timestamp, gpsElement);
  }

  get avl(): any {
    return super.avl;
  }
}