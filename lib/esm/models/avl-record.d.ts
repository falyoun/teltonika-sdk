import { GpsElement } from './gps-element';
import { IoElement } from './io-element';
export declare class AvlRecord {
    priority: number;
    timestamp: string;
    gps: GpsElement;
    event_id: number;
    properties_count: number;
    ioElements: IoElement[];
    constructor(priority: number, timestamp: string, gps: GpsElement, event_id: number, properties_count: number, ioElements: IoElement[]);
    print(): void;
}
