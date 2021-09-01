import { AvlDataCollection } from '@app/codecs';

export class UdpTeltonikaPacket {
  length: number;
  packetId: number;
  packetType: number;
  avlPacketId: number;
  imeiLength: number;
  imei: any;
  avlData: AvlDataCollection;
}
