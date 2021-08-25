// Codec For Communication Over Gprs Messages
import { CodecsTypesEnum, GpsElement, IoElement } from '@app/codecs';

export class tcpCFCOGMPacketBody {
  commandType: number;
  commandSize: number;
  command: string;
}
// Codec For Device Data Sending
export class tcpCFDDSPacketBody {
  public priority: number;
  public timestamp: Date;
  public gps: GpsElement;
  public event_id: number;
  public properties_count: number;
  public ioElements: IoElement[]
  // constructor(
  //   public priority: number,
  //   public timestamp: string,
  //   public gps: GpsElement,
  //   public event_id: number,
  //   public properties_count: number,
  //   public ioElements: IoElement[],
  // ) {}
  public print() {
    console.log(this.timestamp)
    console.log('Native elements ->: ');
    console.table({
      priority: this.priority,
      timestamp: this.timestamp,
      eventId: this.event_id,
      prioritiesCount: this.properties_count,
    });

    console.log('Nested element ->:: IoElements ');
    // console.log(this.ioElements)
    // console.log(this.ioElements.length)
    this.ioElements.forEach(x => console.table(x));
    console.log('Nested element -> :: gpsElement');
    for (const [key, value] of Object.entries(this.gps)) {
      console.log(`Key: ${key} :::: Value: ${value}`);
    }
  }
}
export class TcpPacketHeader {
  zeros: number;
  codecId: number;
  dataSize: number;
  numberOfRecords1: number;
}
export class TcpPacketFooter {
  numberOfRecords2: number;
  CRC: any;
}
export class TcpTeltonikaPacket {
  header: TcpPacketHeader;
  body: tcpCFCOGMPacketBody | Array<tcpCFDDSPacketBody>;
  footer: TcpPacketFooter;
  constructor(codecType: CodecsTypesEnum) {
    if(codecType === CodecsTypesEnum.DEVICE_DATA_SENDING_CODEC) {
      this.body = new Array<tcpCFDDSPacketBody>();
    } else {
      this.body = new tcpCFCOGMPacketBody();
    }

    this.header = new TcpPacketHeader();
    this.footer = new TcpPacketFooter();
  }
}