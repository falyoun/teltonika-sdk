// Codec For Communication Over Gprs Messages
import { AvlData, CodecsTypesEnum, GpsElement, IoElement } from '@app/codecs';

export class tcpCFCOGMPacketBody {
  commandType: number;
  commandSize: number;
  command: string;
}

// Codec For Device Data Sending
export class tcpCFDDSPacketBody {
  public numberOfRecords1: number;
  public codecId: number;
  public avlData: AvlData;
  public numberOfRecords2: number;
  // constructor(
  //   public priority: number,
  //   public timestamp: string,
  //   public gps: GpsElement,
  //   public event_id: number,
  //   public properties_count: number,
  //   public ioElements: IoElement[],
  // ) {}
}
export class TcpPacketHeader {
  preamble: number;
  length: number;
}
export class TcpPacketFooter {
  crc: any;
}
export class TcpTeltonikaPacket {
  header: TcpPacketHeader;
  body: tcpCFCOGMPacketBody | Array<tcpCFDDSPacketBody>;
  footer: TcpPacketFooter;
  constructor(codecType: CodecsTypesEnum) {
    if (codecType === CodecsTypesEnum.DEVICE_DATA_SENDING_CODEC) {
      this.body = new Array<tcpCFDDSPacketBody>();
    } else {
      this.body = new tcpCFCOGMPacketBody();
    }
    this.header = new TcpPacketHeader();
    this.footer = new TcpPacketFooter();
  }
}
