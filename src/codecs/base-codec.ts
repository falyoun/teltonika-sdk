import { BinaryReader } from '@app/binary-data-handler';
import { tcpCFCOGMPacketBody, tcpCFDDSPacketBody } from '@app/codecs/models';

export abstract class BaseCodec {
  protected constructor(protected reader: BinaryReader) {
    this.reader = reader;
  }
  protected abstract decodeAvlPacket():
    | tcpCFCOGMPacketBody
    | Array<tcpCFDDSPacketBody>;

  public decode(): tcpCFCOGMPacketBody | Array<tcpCFDDSPacketBody> {
    return this.decodeAvlPacket();
  }
}
