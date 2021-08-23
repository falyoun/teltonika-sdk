export declare class GpsElement {
    longitude: any;
    latitude: any;
    altitude: any;
    angle: any;
    satellites: any;
    speed: any;
    constructor(longitude: any, latitude: any, altitude: any, angle: any, satellites: any, speed: any);
    static isLatValid(latitude: number): boolean;
    static isLngValid(longitude: number): boolean;
}
