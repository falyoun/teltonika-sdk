import { TcpCFDDSPacketBody } from '@app/codecs';

export interface ICodecDecoder {
  decodeAvlPacket: () => Array<TcpCFDDSPacketBody>;
}
