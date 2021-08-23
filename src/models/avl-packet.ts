import { AvlRecord } from './avl-record';

export class AvlPacket {
  constructor(
    public records: AvlRecord[],
    public zero: any,
    public data_length: number,
    public codec_id: number,
    public number_of_data: number,
    public number_of_data2: number,
    public CRC: any
  ) {
  }
}