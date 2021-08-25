import { BaseCfdds } from '../base-cfdds';
export declare class Codec16 extends BaseCfdds {
    constructor(reader: any);
    private _parseIoElements;
    decodeBody(): void;
}
