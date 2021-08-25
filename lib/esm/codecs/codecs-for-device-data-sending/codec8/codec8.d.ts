import { BaseCodec } from '../../base-codec';
export declare class Codec8 extends BaseCodec {
    private readonly _gpsPrecision;
    constructor(reader: any, codecType: any);
    private _parseIoElements;
    decodeBody(): void;
}
