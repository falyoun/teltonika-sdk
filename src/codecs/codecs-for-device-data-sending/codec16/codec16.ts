import { convertBytesToInt } from '@app/utils';
import { BaseCodec } from '../../base-codec';
import { tcpCFDDSPacketBody } from '@app/codecs';

export class Codec16 extends BaseCodec {
  constructor(reader, codecType) {
    super(reader, codecType);
  }

  private _parseIoElements() {
    let ioElement = [];

    let ioCountInt8 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt8; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(2));
      let value = convertBytesToInt(this.reader.readBytes(1));
      ioElement.push({ id: property_id, value: value });
    }

    let ioCountInt16 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt16; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(2));
      let value = this.reader.readInt16();
      ioElement.push({ id: property_id, value: value });
    }

    let ioCountInt32 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt32; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(2));
      let value = this.reader.readInt32();
      ioElement.push({ id: property_id, value: value });
    }

    let ioCountInt64 = convertBytesToInt(this.reader.readBytes(1));
    for (let i = 0; i < ioCountInt64; i++) {
      let property_id = convertBytesToInt(this.reader.readBytes(2));
      let value = this.reader.readInt64();
      ioElement.push({ id: property_id, value: value });
    }

    return ioElement;
  }

  decodeBody(): void {
    const body = this.tcpTeltonikaPacket.body as tcpCFDDSPacketBody[];
    for (let i = 0; i < this.tcpTeltonikaPacket.header.numberOfRecords1; i++) {
      let avlRecord: any = {};
      avlRecord.timestamp = new Date(
        convertBytesToInt(this.reader.readBytes(8)),
      );
      avlRecord.priority = convertBytesToInt(this.reader.readBytes(1));
      avlRecord.longtitude = this.reader.readInt32();
      avlRecord.latitude = this.reader.readInt32();
      avlRecord.atitude = this.reader.readInt16();
      avlRecord.angle = this.reader.readInt16();
      avlRecord.satelites = this.reader.readInt8();
      avlRecord.speed = this.reader.readInt16();

      avlRecord.event_id = convertBytesToInt(this.reader.readBytes(2));
      avlRecord.generationType = convertBytesToInt(this.reader.readBytes(1));
      avlRecord.properties_count = convertBytesToInt(this.reader.readBytes(1));
      avlRecord.ioElements = [];

      for (let j = 0; j < avlRecord.properties_count; j++) {
        avlRecord.ioElements.push(this._parseIoElements());
      }

      body.push(avlRecord);
    }
    this.tcpTeltonikaPacket.body = body;
  }
}
