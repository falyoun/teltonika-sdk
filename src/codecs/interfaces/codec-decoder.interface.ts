import { tcpCFCOGMPacketBody, tcpCFDDSPacketBody } from '@app/codecs';

export interface ICodecDecoder {
  decodeAvlPacket: () => tcpCFCOGMPacketBody | Array<tcpCFDDSPacketBody>;
}
