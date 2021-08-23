export declare class Codec {
    protected reader: any;
    protected number_of_records: number;
    avlObj: any;
    static get TRIP_EVENT_ID(): number;
    static get TRIP_EVENT_START(): number;
    static get TRIP_EVENT_END(): number;
    constructor(reader: any, number_of_records: number);
    process(): void;
    get avl(): any;
}
