import { BaseCodec } from '../../base-codec';
export declare class Codec8ex extends BaseCodec {
    _gpsPrecision: any;
    constructor(reader: any, codecType: any);
    decodeBody(): void;
    private _parseIoElements;
}
