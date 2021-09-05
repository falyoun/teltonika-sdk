import {
  calculateCRC,
  convertBytesToInt,
  prepareIOEntity,
  sanitizeGPS,
} from '@app/utils';
import {
  BaseCodec,
  Codec12,
  Codec13,
  Codec14,
  Codec16,
  Codec8,
  Codec8ex,
  Codec8IoElements,
  CodecsTypesEnum,
  tcpCFDDSPacketBody,
  TcpTeltonikaPacket,
} from '@app/codecs';
import { BinaryReader } from '@app/binary-data-handler';
import * as crcLib from 'crc';

export enum DecoderTypes {
  UDP_DECODER = 'udp_decoder',
  TCP_DECODER = 'tcp_decoder',
}
export class TeltonikaPacketsParser {
  private _reader: BinaryReader;
  private isImei = false;
  private imei: any;
  private _codec: BaseCodec;
  private _tcpTeltonikaPacket: TcpTeltonikaPacket;
  private _udpPacket: {
    header: any;
    body: any;
    footer: any;
  };
  private readonly _buff;
  constructor(buffer) {
    this._buff = buffer;
    this._reader = new BinaryReader(buffer);
  }
  decodeTcpData() {
    // this.checkIsImei();
    if (!this.isImei) {
      // Header
      const preamble = this._reader.readInt32(); // convertBytesToInt(this._reader.readBytes(4));
      const length = this._reader.readInt32(); // convertBytesToInt(this._reader.readBytes(4));
      const codecId = convertBytesToInt(this._reader.readBytes(1));
      if (codecId === 8 || codecId === 142 || codecId === 16) {
        this.tcpTeltonikaPacket = new TcpTeltonikaPacket(
          CodecsTypesEnum.DEVICE_DATA_SENDING_CODEC,
        );
      } else {
        this.tcpTeltonikaPacket = new TcpTeltonikaPacket(
          CodecsTypesEnum.COMMUNICATION_OVER_GPRS_CODEC,
        );
      }
      this.tcpTeltonikaPacket.header = {
        preamble,
        length,
      };
      // Parse body
      const data = this._reader.readBytes(length - 1);

      // Footer
      // const numberOfRecords2 = convertBytesToInt(this._reader.readBytes(1));
      const crc = this._reader.readInt32();
      // let crc = 0;
      this.tcpTeltonikaPacket.footer = {
        crc,
      };
      if (preamble != 0)
        throw new Error('Unable to decode. Missing package prefix.');

      // if (crc != calculateCRC(data))
      //   throw new Error('CRC does not match the expected.');

      return this.process(codecId);
    }
    return null;
  }
  decodeUdpData() {
    const preamble = convertBytesToInt(this._reader.readBytes(2));
    const packetId = convertBytesToInt(this._reader.readBytes(2));
    const packetType = convertBytesToInt(this._reader.readBytes(1));
    const avlPacketId = convertBytesToInt(this._reader.readBytes(1));
    const imeiLength = convertBytesToInt(this._reader.readBytes(2));
    const imei = convertBytesToInt(this._reader.readBytes(imeiLength));
    const codecId = convertBytesToInt(this._reader.readBytes(1));
    console.log({
      preamble,
      packetId,
      packetType,
      avlPacketId,
      imeiLength,
      imei,
      codecId,
    });

    const dataSize1 = convertBytesToInt(this._reader.readBytes(1));
    for (let i = 0; i < dataSize1; i++) {
      let avlRecord = {
        timestamp: new Date(convertBytesToInt(this._reader.readBytes(8))),
        priority: convertBytesToInt(this._reader.readBytes(1)),
        gps: {
          longitude: this._reader.readInt32(),
          latitude: this._reader.readInt32(),
          altitude: this._reader.readInt16(),
          angle: this._reader.readInt16(),
          satellites: this._reader.readInt8(),
          speed: this._reader.readInt16(),
        },
        event_id: convertBytesToInt(this._reader.readBytes(1)),
        properties_count: convertBytesToInt(this._reader.readBytes(1)),
        ioElements: [],
      };
      avlRecord = sanitizeGPS(avlRecord, 1000000);
      avlRecord.ioElements = this._parseIoElements();
      console.log(avlRecord);
    }
    const dataSize2 = convertBytesToInt(this._reader.readBytes(1));
    console.log({ dataSize2 });
  }

  private checkIsImei() {
    const imeiLength = convertBytesToInt(this._reader.readBytes(2));
    console.log({ imeiLength });
    if (imeiLength > 0) {
      this.isImei = true;
      this.imei = this._reader.readBytes(imeiLength).toString();
      console.log({ imei: this.imei });
    } else {
      convertBytesToInt(this._reader.readBytes(2));
    }
  }

  private _parseIoElements() {
    const ioElement = [];
    const ioCountInt8 = convertBytesToInt(this._reader.readBytes(1));
    for (let i = 0; i < ioCountInt8; i++) {
      const property_id = convertBytesToInt(this._reader.readBytes(1));
      const value = convertBytesToInt(this._reader.readBytes(1));
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    const ioCountInt16 = convertBytesToInt(this._reader.readBytes(1));
    for (let i = 0; i < ioCountInt16; i++) {
      const property_id = convertBytesToInt(this._reader.readBytes(1));
      const value = this._reader.readInt16();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    const ioCountInt32 = convertBytesToInt(this._reader.readBytes(1));
    for (let i = 0; i < ioCountInt32; i++) {
      const property_id = convertBytesToInt(this._reader.readBytes(1));
      const value = this._reader.readInt32();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    const ioCountInt64 = convertBytesToInt(this._reader.readBytes(1));
    for (let i = 0; i < ioCountInt64; i++) {
      const property_id = convertBytesToInt(this._reader.readBytes(1));
      const value = this._reader.readDouble();
      ioElement.push(prepareIOEntity(property_id, value, Codec8IoElements));
    }

    return ioElement;
  }
  private process(codecId) {
    // We need to advance the point until we encounter the id
    // with the result of that, we can destruct the id value
    // this._reader.readInt32(); // data size record
    // const codec_id = convertBytesToInt(this._reader.readBytes(1));
    this._reader = new BinaryReader(this._buff);
    console.log(this._reader.readBytes(9));
    switch (codecId) {
      case 8:
        this._codec = new Codec8(this._reader);
        break;
      case 142:
        this._codec = new Codec8ex(this._reader);
        break;
      case 16:
        this._codec = new Codec16(this._reader);
        break;
      case 12:
        this._codec = new Codec12(this._reader);
        break;
      case 13:
        this._codec = new Codec13(this._reader);
        break;
      case 14:
        this._codec = new Codec14(this._reader);
        break;
    }

    this.tcpTeltonikaPacket.body = this._codec.decode();
    console.log(this.tcpTeltonikaPacket);
    return this.tcpTeltonikaPacket;
  }
  get codec() {
    return this._codec;
  }
  set tcpTeltonikaPacket(value) {
    this._tcpTeltonikaPacket = value;
  }
  get tcpTeltonikaPacket() {
    return this._tcpTeltonikaPacket;
  }
}
