"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codec = void 0;
var Codec = /** @class */ (function () {
    function Codec(reader, number_of_records) {
        this.reader = reader;
        this.number_of_records = number_of_records;
        this.avlObj = {};
        this.reader = reader;
        this.number_of_records = number_of_records;
    }
    Object.defineProperty(Codec, "TRIP_EVENT_ID", {
        get: function () {
            return 250;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Codec, "TRIP_EVENT_START", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Codec, "TRIP_EVENT_END", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Codec.prototype.process = function () {
        this.parseHeader();
    };
    Object.defineProperty(Codec.prototype, "avl", {
        get: function () {
            return this.avlObj;
        },
        enumerable: false,
        configurable: true
    });
    return Codec;
}());
exports.Codec = Codec;
