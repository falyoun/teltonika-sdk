import { GpsElement } from '@app/codecs';
export declare const sanitizeLongLat: (gpsElement: GpsElement, gpsPrecision?: number) => any;
export declare const sanitizeGPS: (avlRecord: any, gpsPrecision?: number) => any;
export declare const prepareIOEntity: (property_id: any, value: any, ioElements: any) => {
    id: any;
    value: any;
    label: any;
    dimension: any;
    valueHuman: any;
};
