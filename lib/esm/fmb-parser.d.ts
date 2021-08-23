export declare class FmbParser {
    _reader: any;
    _avlObj: any;
    isImei: boolean;
    imei: any;
    _codecReader: any;
    _codec: any;
    constructor(buffer: any);
    checkIsImei(): void;
    parseHeader(): void;
    decodeData(): void;
    parseFooter(): void;
    get avl(): any;
}
