/**
 * Codec12 is the original and main Teltonika protocol for device-server communication over GPRS messages.
 * Codec12 GPRS commands can be used for sending configuration, debug, digital outputs control commands or other (special purpose command on special firmware versions).
 * This protocol is also necessary for using FMB630/FM6300/FM5300/FM5500/FM4200 features like: Garmin, LCD communication, COM TCP Link Mode.
 */
import { Codec } from '../../codec';
export declare class Codec12 extends Codec {
    constructor(reader: any, number_of_records: number);
    parseHeader(): void;
    parseAvlRecords(): void;
}
