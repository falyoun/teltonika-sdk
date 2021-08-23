"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHexToAscii = exports.convertBytesToAscii = exports.convertBytesToInt = void 0;
var convertBytesToInt = function (bytes, numeralSystem, radix) {
    if (numeralSystem === void 0) { numeralSystem = 'hex'; }
    if (radix === void 0) { radix = 16; }
    return (parseInt(bytes.toString(numeralSystem), radix));
};
exports.convertBytesToInt = convertBytesToInt;
var convertBytesToAscii = function (bytes, numeralSystem) {
    if (numeralSystem === void 0) { numeralSystem = 'utf-8'; }
    return bytes.toString(numeralSystem);
};
exports.convertBytesToAscii = convertBytesToAscii;
var convertHexToAscii = function (hexString, numeralSystem) {
    if (numeralSystem === void 0) { numeralSystem = 'hex'; }
    return Buffer.from(hexString, numeralSystem).toString("utf-8");
};
exports.convertHexToAscii = convertHexToAscii;
