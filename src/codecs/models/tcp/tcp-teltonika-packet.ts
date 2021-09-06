// Codec For Communication Over Gprs Messages
import { AvlData } from '@app/codecs';

export class TcpCFCOGMPacketBody {
  commandType: number;
  commandSize: number;
  command: string;
}

// Codec For Device Data Sending
export class TcpCFDDSPacketBody {
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
  body: Array<TcpCFDDSPacketBody>;
  footer: TcpPacketFooter;
  constructor() {
    this.body = new Array<TcpCFDDSPacketBody>();
    this.header = new TcpPacketHeader();
    this.footer = new TcpPacketFooter();
  }
}
