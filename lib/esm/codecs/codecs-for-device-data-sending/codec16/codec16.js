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
exports.Codec16 = void 0;
// import * as binutils from 'binutils64';
var utils_1 = require("../../../utils");
var codecs_1 = require("../..");
var Codec16 = /** @class */ (function (_super) {
    __extends(Codec16, _super);
    function Codec16(reader, number_of_records) {
        return _super.call(this, reader, number_of_records) || this;
    }
    Codec16.prototype.parseHeader = function () {
        this.avlObj.records = [];
        for (var i = 0; i < this.number_of_records; i++) {
            this.parseAvlRecords();
        }
    };
    Codec16.prototype.parseAvlRecords = function () {
        var avlRecord = {};
        avlRecord.timestamp = new Date(utils_1.convertBytesToInt(this.reader.ReadBytes(8)));
        avlRecord.priority = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        avlRecord.longtitude = this.reader.ReadInt32();
        avlRecord.latitude = this.reader.ReadInt32();
        avlRecord.atitude = this.reader.ReadInt16();
        avlRecord.angle = this.reader.ReadInt16();
        avlRecord.satelites = this.reader.ReadInt8();
        avlRecord.speed = this.reader.ReadInt16();
        avlRecord.event_id = utils_1.convertBytesToInt(this.reader.ReadBytes(2));
        avlRecord.generationType = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        avlRecord.properties_count = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        avlRecord.ioElements = [];
        for (var j = 0; j < avlRecord.properties_count; j++) {
            avlRecord.ioElements.push(this.parseIoElements());
        }
        this.avlObj.records.push(avlRecord);
    };
    Codec16.prototype.parseIoElements = function () {
        var ioElement = [];
        var ioCountInt8 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt8; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(2));
            var value = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            ioElement.push({ id: property_id, value: value });
        }
        var ioCountInt16 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt16; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(2));
            var value = this.reader.ReadInt16();
            ioElement.push({ id: property_id, value: value });
        }
        var ioCountInt32 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt32; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(2));
            var value = this.reader.ReadInt32();
            ioElement.push({ id: property_id, value: value });
        }
        var ioCountInt64 = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
        for (var i = 0; i < ioCountInt64; i++) {
            var property_id = utils_1.convertBytesToInt(this.reader.ReadBytes(2));
            var value = this.reader.ReadInt64();
            ioElement.push({ id: property_id, value: value });
        }
        return ioElement;
    };
    Codec16.prototype.getAvl = function () {
        return this.avlObj;
    };
    return Codec16;
}(codecs_1.Codec));
exports.Codec16 = Codec16;
