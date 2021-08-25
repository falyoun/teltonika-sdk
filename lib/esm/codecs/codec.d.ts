export declare class Codec {
    protected reader: any;
    protected number_of_records: number;
    avlObj: any;
    constructor(reader: any, number_of_records: number);
    process(): void;
    get avl(): any;
}
