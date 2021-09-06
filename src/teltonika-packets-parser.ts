import { convertBytesToInt, prepareIOEntity, sanitizeGPS } from '@app/utils';
import {
  DdsBaseClass,
  Codec12,
  Codec13,
  Codec14,
  Codec16,
  Codec8,
  Codec8ex,
  CodecsTypesEnum,
  TcpTeltonikaPacket,
  CogmBaseClass,
} from '@app/codecs';
import { BinaryReader, BinaryWriter } from '@app/binary-data-handler';

export class TeltonikaPacketsParser {
  private _reader: BinaryReader;
  private _writer: BinaryWriter;
  private isImei = false;
  private imei: any;
  private _codec: DdsBaseClass | CogmBaseClass;
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
    this._writer = new BinaryWriter();
  }
  decodeTcpData() {
    // this.checkIsImei();
    if (!this.isImei) {
      // Header
      const preamble = this._reader.readInt32(); // convertBytesToInt(this._reader.readBytes(4));
      const length = this._reader.readInt32(); // convertBytesToInt(this._reader.readBytes(4));
      const codecId = convertBytesToInt(this._reader.readBytes(1));
      if (codecId === 8 || codecId === 142 || codecId === 16) {
        this._tcpTeltonikaPacket = new TcpTeltonikaPacket();
      } else {
        this._tcpTeltonikaPacket = new TcpTeltonikaPacket();
      }
      this._tcpTeltonikaPacket.header = {
        preamble,
        length,
      };
      // Parse body
      const data = this._reader.readBytes(length - 1);

      // Footer
      // const numberOfRecords2 = convertBytesToInt(this._reader.readBytes(1));
      const crc = this._reader.readInt32();
      // let crc = 0;
      this._tcpTeltonikaPacket.footer = {
        crc,
      };
      if (preamble != 0)
        throw new Error('Unable to decode. Missing package prefix.');

      // if (crc != calculateCRC(data))
      //   throw new Error('CRC does not match the expected.');

      // We need to advance the point until we encounter the id
      // with the result of that, we can destruct the id value
      // this._reader.readInt32(); // data size record
      // const codec_id = convertBytesToInt(this._reader.readBytes(1));
      this._reader = new BinaryReader(this._buff);
      console.log(this._reader.readBytes(9));
      this._codec = this._getRequiredCodec(codecId);
      if (this._codec instanceof DdsBaseClass) {
        this._tcpTeltonikaPacket.body = this._codec.decode();
      } else {
        // TODO("Un-implemented flow")
      }
      console.log(this._tcpTeltonikaPacket);
      return this._tcpTeltonikaPacket;
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
    this._codec = this._getRequiredCodec(codecId);
    const p = this._codec.decode();
    console.log(p);
    // const dataSize1 = convertBytesToInt(this._reader.readBytes(1));
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
  private _getRequiredCodec(codecId): DdsBaseClass | CogmBaseClass {
    switch (codecId) {
      case 8:
        return new Codec8(this._reader);
      case 142:
        return new Codec8ex(this._reader);

      case 16:
        return new Codec16(this._reader);

      case 12:
        return new Codec12(this._reader, this._writer);

      case 13:
        return new Codec13(this._reader, this._writer);

      case 14:
        return new Codec14(this._reader, this._writer);
      default:
        throw new Error('Codec id does not match with any of available codecs');
    }
  }
}
