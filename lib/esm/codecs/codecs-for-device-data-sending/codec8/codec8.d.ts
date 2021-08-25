import { BaseCfdds } from '../base-cfdds';
export declare class Codec8 extends BaseCfdds {
    private readonly _gpsPrecision;
    constructor(reader: any);
    private _parseIoElements;
    decodeBody(): void;
}
