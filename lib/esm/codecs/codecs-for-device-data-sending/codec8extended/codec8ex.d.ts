import { Codec } from '../../codec';
export declare class Codec8ex extends Codec {
    _gpsPrecision: any;
    static get ODOMETER_PROPERTY_ID(): number;
    constructor(reader: any, number_of_records: any);
    parseHeader(): void;
    parseAvlRecords(): void;
    parseIoElements(): any[];
}
