"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FmbParser = void 0;
var binutils = __importStar(require("binutils64"));
var codecs_1 = require("./codecs");
var utils_1 = require("./utils");
var codec12_1 = require("./codecs/codecs-for-communication-over-gprs-messages/codec12/codec12");
var codec16_1 = require("./codecs/codecs-for-device-data-sending/codec16");
var codecs_for_communication_over_gprs_messages_1 = require("./codecs/codecs-for-communication-over-gprs-messages");
var FmbParser = /** @class */ (function () {
    function FmbParser(buffer) {
        this.isImei = false;
        this._reader = new binutils.BinaryReader(buffer);
        this._avlObj = {};
        this.checkIsImei();
        if (!this.isImei) {
            this.parseHeader();
            this.decodeData();
            this.parseFooter();
        }
    }
    FmbParser.prototype.checkIsImei = function () {
        var imeiLength = utils_1.convertBytesToInt(this._reader.ReadBytes(2));
        console.log({ imeiLength: imeiLength });
        if (imeiLength > 0) {
            this.isImei = true;
            this.imei = this._reader.ReadBytes(imeiLength).toString();
            console.log({ imei: this.imei });
        }
        else {
            utils_1.convertBytesToInt(this._reader.ReadBytes(2));
        }
    };
    FmbParser.prototype.parseHeader = function () {
        this._avlObj = {
            // zeros: this._reader.ReadBytes(4),
            data_length: this._reader.ReadInt32(),
            codec_id: utils_1.convertBytesToInt(this._reader.ReadBytes(1)),
            number_of_data: utils_1.convertBytesToInt(this._reader.ReadBytes(1)),
        };
        this._codecReader = this._reader;
        switch (this._avlObj.codec_id) {
            case 8:
                this._codec = new codecs_1.Codec8(this._codecReader, this._avlObj.number_of_data);
                break;
            case 142:
                this._codec = new codecs_1.Codec8ex(this._codecReader, this._avlObj.number_of_data);
                break;
            case 16:
                this._codec = new codec16_1.Codec16(this._codecReader, this._avlObj.number_of_data);
                break;
            case 12:
                this._codec = new codec12_1.Codec12(this._codecReader, this._avlObj.number_of_data);
                break;
            case 13:
                this._codec = new codecs_for_communication_over_gprs_messages_1.Codec13(this._codecReader, this._avlObj.number_of_data);
                break;
        }
    };
    FmbParser.prototype.decodeData = function () {
        if (this._codec) {
            this._codec.process();
            var intAvl = this._codec.avl;
            intAvl.zero = this._avlObj.zero;
            intAvl.data_length = this._avlObj.data_length;
            intAvl.codec_id = this._avlObj.codec_id;
            intAvl.number_of_data = this._avlObj.number_of_data;
            this._avlObj = intAvl;
        }
    };
    FmbParser.prototype.parseFooter = function () {
        this._avlObj.number_of_data2 = utils_1.convertBytesToInt(this._reader.ReadBytes(1));
        this._avlObj.CRC = {
            0: utils_1.convertBytesToInt(this._reader.ReadBytes(1)),
            1: utils_1.convertBytesToInt(this._reader.ReadBytes(1)),
            2: utils_1.convertBytesToInt(this._reader.ReadBytes(1)),
            3: utils_1.convertBytesToInt(this._reader.ReadBytes(1)),
        };
    };
    Object.defineProperty(FmbParser.prototype, "avl", {
        get: function () {
            return this._avlObj;
        },
        enumerable: false,
        configurable: true
    });
    return FmbParser;
}());
exports.FmbParser = FmbParser;
