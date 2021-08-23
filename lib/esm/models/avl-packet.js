"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvlPacket = void 0;
var AvlPacket = /** @class */ (function () {
    function AvlPacket(records, zero, data_length, codec_id, number_of_data, number_of_data2, CRC) {
        this.records = records;
        this.zero = zero;
        this.data_length = data_length;
        this.codec_id = codec_id;
        this.number_of_data = number_of_data;
        this.number_of_data2 = number_of_data2;
        this.CRC = CRC;
    }
    return AvlPacket;
}());
exports.AvlPacket = AvlPacket;
