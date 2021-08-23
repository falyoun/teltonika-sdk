import { GpsElement } from './gps-element';
import { IoElement } from './io-element';

export class AvlRecord {
  constructor(
    public priority: number,
    public timestamp: string,
    public gps: GpsElement,
    public event_id: number,
    public properties_count: number,
    public ioElements: IoElement[],
  ) {}
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
