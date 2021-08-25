"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareIOEntity = exports.sanitizeGPS = exports.sanitizeLongLat = void 0;
var codecs_1 = require("../codecs");
var sanitizeLongLat = function (gpsElement, gpsPrecision) {
    if (gpsPrecision === void 0) { gpsPrecision = 10000000; }
    return exports.sanitizeGPS({ gps: __assign({}, gpsElement) }, gpsPrecision);
};
exports.sanitizeLongLat = sanitizeLongLat;
var sanitizeGPS = function (avlRecord, gpsPrecision) {
    if (gpsPrecision === void 0) { gpsPrecision = 10000000; }
    try {
        var longitude = avlRecord.gps.longitude;
        var latitude = avlRecord.gps.latitude;
        if ('0' == longitude.toString(2).substr(0, 1)) {
            avlRecord.gps.longitude *= -1;
        }
        avlRecord.gps.longitude /= gpsPrecision;
        if ('0' == latitude.toString(2).substr(0, 1)) {
            avlRecord.gps.latitude *= -1;
        }
        avlRecord.gps.latitude /= gpsPrecision;
        return avlRecord;
    }
    catch (e) {
        console.error('sanitizeGPS: ', e);
        return avlRecord;
    }
};
exports.sanitizeGPS = sanitizeGPS;
var prepareIOEntity = function (property_id, value, ioElements) {
    var label = ioElements[property_id]
        ? ioElements[property_id].label
        : '';
    var dimension = ioElements[property_id]
        ? ioElements[property_id].dimension
        : '';
    var valueHuman = ioElements[property_id]
        ? ioElements[property_id].values
            ? ioElements[property_id].values[value]
            : ''
        : '';
    return {
        id: property_id,
        value: value,
        label: label,
        dimension: dimension,
        valueHuman: valueHuman,
    };
};
exports.prepareIOEntity = prepareIOEntity;
