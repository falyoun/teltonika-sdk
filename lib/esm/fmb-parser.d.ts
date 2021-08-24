export declare class FmbParser {
    private readonly _reader;
    private _avlObj;
    private isImei;
    private imei;
    private _codecReader;
    private _codec;
    constructor(buffer: any);
    checkIsImei(): void;
    private parseHeader;
    private decodeData;
    private parseFooter;
    get avl(): any;
}
