import { convertBytesToInt } from '@app/utils';
import { ICodecDecoder } from '@app/codecs/interfaces';
import { CodecsTypesEnum, TcpTeltonikaPacket } from '@app/codecs';


export abstract class BaseCodec implements ICodecDecoder {
  private readonly _tcpTeltonikaPacket: TcpTeltonikaPacket;

  protected constructor(
    protected reader: any,
    codecType: CodecsTypesEnum
  ) {
    this.reader = reader;
    this._tcpTeltonikaPacket = new TcpTeltonikaPacket(codecType);
  }

  // This aims to act as the main method in reading decoding and handling packets received from devices
  public decodePacket() {
    this.decodeHeader();
    this.decodeBody();
    this.decodeFooter();
    return this._tcpTeltonikaPacket;
  }


  protected get tcpTeltonikaPacket() {
    return this._tcpTeltonikaPacket;
  }

  protected abstract decodeBody(): void;

  private decodeFooter() {
    this.tcpTeltonikaPacket.footer = {
      numberOfRecords2: convertBytesToInt(this.reader.ReadBytes(1)),
      CRC: {
        0: convertBytesToInt(this.reader.ReadBytes(1)),
        1: convertBytesToInt(this.reader.ReadBytes(1)),
        2: convertBytesToInt(this.reader.ReadBytes(1)),
        3: convertBytesToInt(this.reader.ReadBytes(1)),
      },
    }
  }

  private decodeHeader() {
    this.tcpTeltonikaPacket.header = {
      zeros: convertBytesToInt(this.reader.ReadBytes(4)),
      dataSize: this.reader.ReadInt32(),
      codecId: convertBytesToInt(this.reader.ReadBytes(1)),
      numberOfRecords1: convertBytesToInt(this.reader.ReadBytes(1))
    };
  }
}