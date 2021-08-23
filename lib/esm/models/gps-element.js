"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GpsElement = void 0;
var GpsElement = /** @class */ (function () {
    function GpsElement(longitude, latitude, altitude, angle, satellites, speed) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.angle = angle;
        this.satellites = satellites;
        this.speed = speed;
    }
    GpsElement.isLatValid = function (latitude) {
        return -90 <= latitude && latitude <= 90;
    };
    GpsElement.isLngValid = function (longitude) {
        return -180 <= longitude && longitude <= 180;
    };
    return GpsElement;
}());
exports.GpsElement = GpsElement;
