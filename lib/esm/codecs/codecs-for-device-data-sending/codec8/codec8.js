"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codec8 = void 0;
var utils_1 = require("../../../utils");
var codecs_1 = require("../..");
var Codec8 = /** @class */ (function (_super) {
    __extends(Codec8, _super);
    function Codec8(reader, number_of_records) {
        var _this = _super.call(this, reader, number_of_records) || this;
        _this._gpsPrecision = 10000000;
        return _this;
    }
    Object.defineProperty(Codec8, "ODOMETER_PROPERTY_ID", {
        get: function () {
            return 16;
        },
        enumerable: false,
        configurable: true
    });
    Codec8.prototype.parseHeader = function () {
        this.avlObj.records = [];
        for (var i = 0; i < this.number_of_records; i++) {
            this.parseAvlRecords();
        }
    };
    Codec8.prototype.parseAvlRecords = function () {
        var avlRecord = {
            timestamp: new Date(utils_1.convertBytesToInt(this.reader.ReadBytes(8))),
            priority: utils_1.convertBytesToInt(this.reader.ReadBytes(1)),
            gps: {
                longitude: this.reader.ReadInt32(),
                latitude: this.reader.ReadInt32(),
                altitude: this.reader.ReadInt16(),
                angle: this.reader.ReadInt16(),
                satellites: this.reader.ReadInt8(),
                speed: this.reader.ReadInt16(),
            },
            event_id: utils_1.convertBytesToInt(this.reader.ReadBytes(1)),
            properties_count: utils_1.convertBytesToInt(this.reader.ReadBytes(1)),
            ioElements: [],
        };
        avlRecord = utils_1.sanitizeGPS(avlRecord, this._gpsPrecision);
        avlRecord.ioElements = this.parseIoElements();
        this.avlObj.records.push(avlRecord);
    };
    Codec8.prototype.parseIoElements = function () {
        var ioElement = [];
        var ioCountInt8 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt8; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            var value = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8IoElements));
        }
        var ioCountInt16 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt16; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            var value = this.reader.ReadInt16();
            ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8IoElements));
        }
        var ioCountInt32 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt32; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            var value = this.reader.ReadInt32();
            ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8IoElements));
        }
        var ioCountInt64 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt64; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            var value = this.reader.ReadDouble();
            ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8IoElements));
        }
        return ioElement;
    };
    return Codec8;
}(codecs_1.Codec));
exports.Codec8 = Codec8;
