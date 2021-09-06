import { BinaryReader } from '@app/binary-data-handler';
import { TcpCFDDSPacketBody } from '@app/codecs';

export abstract class DdsBaseClass {
  protected constructor(protected reader: BinaryReader) {
    this.reader = reader;
  }
  protected abstract decodeAvlPacket(): Array<TcpCFDDSPacketBody>;

  public decode(): Array<TcpCFDDSPacketBody> {
    return this.decodeAvlPacket();
  }
}
