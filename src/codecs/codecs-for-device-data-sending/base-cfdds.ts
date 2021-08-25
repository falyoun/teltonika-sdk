// Cfdds is an abbreviation for (Codecs For Device Data Sending)

import { convertBytesToInt } from '@app/utils';
import { ICodecDecoder } from '@app/codecs/interfaces';



export abstract class BaseCfdds implements ICodecDecoder {
  private readonly _avl: any;

  protected constructor(
    protected reader: any,
  ) {
    this._avl = {};
    this.reader = reader;
  }

  // This aims to act as the main method in reading decoding and handling packets received from devices
  public decodePacket() {
    this.decodeHeader();
    this.decodeBody();
    this.decodeFooter();
    return this._avl;
  }


  protected get avl() {
    return this._avl;
  }

  protected abstract decodeBody(): void;

  private decodeFooter() {
    this.avl.number_of_data2 = convertBytesToInt(this.reader.ReadBytes(1));
    this.avl.CRC = {
      0: convertBytesToInt(this.reader.ReadBytes(1)),
      1: convertBytesToInt(this.reader.ReadBytes(1)),
      2: convertBytesToInt(this.reader.ReadBytes(1)),
      3: convertBytesToInt(this.reader.ReadBytes(1)),
    };
  }

  private decodeHeader() {
    this.avl.zeros = (convertBytesToInt(this.reader.ReadBytes(4)));
    this.avl.data_length = this.reader.ReadInt32();
    this.avl.codec_id = convertBytesToInt(this.reader.ReadBytes(1));
    this.avl.number_of_data = convertBytesToInt(this.reader.ReadBytes(1));
  }
}