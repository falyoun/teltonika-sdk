import { Codec } from '../../codec';
export declare class Codec16 extends Codec {
    reader: any;
    number_of_records: number;
    constructor(reader: any, number_of_records: number);
    process(): void;
}
