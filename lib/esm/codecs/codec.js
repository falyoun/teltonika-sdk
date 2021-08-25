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
