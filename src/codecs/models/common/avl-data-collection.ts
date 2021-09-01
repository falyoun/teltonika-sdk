import { AvlData } from '@app/codecs';

export class AvlDataCollection {
  codecId: number;
  dataCount: number;
  data: Array<AvlData>;
}
