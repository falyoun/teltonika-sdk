import { BaseCfdds } from '../base-cfdds';
export declare class Codec8ex extends BaseCfdds {
    _gpsPrecision: any;
    constructor(reader: any);
    decodeBody(): void;
    private _parseIoElements;
}
