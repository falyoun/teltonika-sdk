import { BinaryReader, BinaryWriter } from '@app/binary-data-handler';
import { Command, TcpCFCOGMPacketBody } from '@app/codecs';

export abstract class CogmBaseClass {
  protected constructor(
    public reader: BinaryReader,
    public writer: BinaryWriter,
  ) {}

  public abstract decode(): TcpCFCOGMPacketBody;
  public abstract encode(command: Command): Buffer;
}
