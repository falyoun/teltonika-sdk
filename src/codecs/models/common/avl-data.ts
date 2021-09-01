import { GpsElement, IoElement } from '@app/codecs';

export class AvlData {
  priority: number;
  dateTime: Date;
  gpsElement: GpsElement;
  ioElements: IoElement[];
}
