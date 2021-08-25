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
exports.Codec8ex = void 0;
var codecs_1 = require("../..");
var utils_1 = require("../../../utils");
var base_cfdds_1 = require("../base-cfdds");
var Codec8ex = /** @class */ (function (_super) {
    __extends(Codec8ex, _super);
    function Codec8ex(reader) {
        var _this = _super.call(this, reader) || this;
        _this._gpsPrecision = 10000000;
        return _this;
    }
    Codec8ex.prototype.decodeBody = function () {
        this.avl.records = [];
        for (var i = 0; i < this.avl.number_of_data; i++) {
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
                event_id: utils_1.convertBytesToInt(this.reader.ReadBytes(2)),
                properties_count: utils_1.convertBytesToInt(this.reader.ReadBytes(2)),
                ioElements: [],
            };
            avlRecord = utils_1.sanitizeGPS(avlRecord, this._gpsPrecision);
            avlRecord.ioElements = this._parseIoElements();
            this.avl.records.push(avlRecord);
        }
    };
    Codec8ex.prototype._parseIoElements = function () {
        var _this = this;
        var ioElement = [];
        // 1 byte
        (function () {
            var ioCountInt8 = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
            for (var i = 0; i < ioCountInt8; i++) {
                var property_id = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
                var value = utils_1.convertBytesToInt(_this.reader.ReadBytes(1));
                ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8extendedIoElements));
            }
        })();
        // 2 byte
        (function () {
            var ioCountInt16 = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
            for (var i = 0; i < ioCountInt16; i++) {
                var property_id = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
                var value = _this.reader.ReadInt16();
                ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8extendedIoElements));
            }
        })();
        // 4 byte
        (function () {
            var ioCountInt32 = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
            for (var i = 0; i < ioCountInt32; i++) {
                var property_id = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
                var value = _this.reader.ReadInt32();
                ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8extendedIoElements));
            }
        })();
        // 8 byte
        (function () {
            var ioCountInt64 = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
            for (var i = 0; i < ioCountInt64; i++) {
                var property_id = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
                var value = _this.reader.ReadDouble();
                ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8extendedIoElements));
            }
        })();
        // x byte
        (function () {
            var ioCountIntX = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
            for (var i = 0; i < ioCountIntX; i++) {
                var property_id = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
                var ioValueLength = utils_1.convertBytesToInt(_this.reader.ReadBytes(2));
                var value = _this.toString(_this.reader.ReadBytes(ioValueLength));
                ioElement.push(utils_1.prepareIOEntity(property_id, value, codecs_1.Codec8extendedIoElements));
            }
        })();
        return ioElement;
    };
    return Codec8ex;
}(base_cfdds_1.BaseCfdds));
exports.Codec8ex = Codec8ex;
