import * as binutils from 'binutils64';
import { Codec8, Codec8ex } from './codecs';
import { convertBytesToInt } from './utils';
import { Codec12 } from './codecs/codecs-for-communication-over-gprs-messages/codec12/codec12';
import { Codec16 } from '@app/codecs/codecs-for-device-data-sending/codec16';
import { Codec13 } from '@app/codecs/codecs-for-communication-over-gprs-messages';

export class FmbParser {
  private readonly _reader: any;
  private _avlObj: any;
  private isImei = false;
  private imei: any;
  private _codecReader: any;
  private _codec: any;

  constructor(buffer) {
    this._reader = new binutils.BinaryReader(buffer);
    this._avlObj = {};
    this.checkIsImei();
    if (!this.isImei) {
      this.parseHeader();
      this.decodeData();
      this.parseFooter();
    }
  }

  checkIsImei() {
    let imeiLength = convertBytesToInt(this._reader.ReadBytes(2));
    console.log({ imeiLength });
    if (imeiLength > 0) {
      this.isImei = true;
      this.imei = this._reader.ReadBytes(imeiLength).toString();
      console.log({ imei: this.imei });
    } else {
      convertBytesToInt(this._reader.ReadBytes(2));
    }
  }

  private parseHeader() {
    this._avlObj = {
      // zeros: this._reader.ReadBytes(4),
      data_length: this._reader.ReadInt32(),
      codec_id: convertBytesToInt(this._reader.ReadBytes(1)),
      number_of_data: convertBytesToInt(this._reader.ReadBytes(1)),
    };

    this._codecReader = this._reader;
    switch (this._avlObj.codec_id) {
      case 8:
        this._codec = new Codec8(
          this._codecReader,
          this._avlObj.number_of_data,
        );
        break;
      case 142:
        this._codec = new Codec8ex(
          this._codecReader,
          this._avlObj.number_of_data,
        );
        break;
      case 16:
        this._codec = new Codec16(
          this._codecReader,
          this._avlObj.number_of_data,
        );
        break;
      case 12:
        this._codec = new Codec12(
          this._codecReader,
          this._avlObj.number_of_data,
        );
        break;
      case 13:
        this._codec = new Codec13(
          this._codecReader,
          this._avlObj.number_of_data,
        );
        break;
    }
  }

  private decodeData() {
    if (this._codec) {
      this._codec.process();
      let intAvl = this._codec.avl;
      intAvl.zero = this._avlObj.zero;
      intAvl.data_length = this._avlObj.data_length;
      intAvl.codec_id = this._avlObj.codec_id;
      intAvl.number_of_data = this._avlObj.number_of_data;

      this._avlObj = intAvl;
    }
  }

  private parseFooter() {
    this._avlObj.number_of_data2 = convertBytesToInt(this._reader.ReadBytes(1));
    this._avlObj.CRC = {
      0: convertBytesToInt(this._reader.ReadBytes(1)),
      1: convertBytesToInt(this._reader.ReadBytes(1)),
      2: convertBytesToInt(this._reader.ReadBytes(1)),
      3: convertBytesToInt(this._reader.ReadBytes(1)),
    };
  }

  get avl() {
    return this._avlObj;
  }
}
