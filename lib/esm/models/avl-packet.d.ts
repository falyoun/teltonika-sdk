import { AvlRecord } from './avl-record';
export declare class AvlPacket {
    records: AvlRecord[];
    zero: any;
    data_length: number;
    codec_id: number;
    number_of_data: number;
    number_of_data2: number;
    CRC: any;
    constructor(records: AvlRecord[], zero: any, data_length: number, codec_id: number, number_of_data: number, number_of_data2: number, CRC: any);
}
