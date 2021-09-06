import { BinaryReader, BinaryWriter } from '@app/binary-data-handler';
import { TcpCFCOGMPacketBody } from '@app/codecs';

export abstract class CogmBaseClass {
  protected constructor(
    public reader: BinaryReader,
    public writer: BinaryWriter,
  ) {}

  public abstract decode(): TcpCFCOGMPacketBody;

  public abstract encode(
    tcpCFCOGMPacketBody: TcpCFCOGMPacketBody,
  ): TcpCFCOGMPacketBody;
}
