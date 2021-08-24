import { Codec } from '@app/codecs';
export declare class Codec16 extends Codec {
    constructor(reader: any, number_of_records: any);
    parseHeader(): void;
    parseAvlRecords(): void;
    parseIoElements(): any[];
    getAvl(): any;
}
