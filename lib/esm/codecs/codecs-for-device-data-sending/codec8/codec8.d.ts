import { Codec } from '../../codec';
export declare class Codec8 extends Codec {
    private readonly _gpsPrecision;
    static get ODOMETER_PROPERTY_ID(): number;
    constructor(reader: any, number_of_records: number);
    parseHeader(): void;
    parseAvlRecords(): void;
    parseIoElements(): any[];
}
