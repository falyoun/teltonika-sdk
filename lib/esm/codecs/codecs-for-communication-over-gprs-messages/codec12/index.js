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
exports.Codec12 = void 0;
/**
 * Codec12 is the original and main Teltonika protocol for device-server communication over GPRS messages.
 * Codec12 GPRS commands can be used for sending configuration, debug, digital outputs control commands or other (special purpose command on special firmware versions).
 * This protocol is also necessary for using FMB630/FM6300/FM5300/FM5500/FM4200 features like: Garmin, LCD communication, COM TCP Link Mode.
 */
var utils_1 = require("../../../utils");
var base_cfcogm_1 = require("../base-cfcogm");
var Codec12 = /** @class */ (function (_super) {
    __extends(Codec12, _super);
    function Codec12(reader) {
        return _super.call(this, reader) || this;
    }
    Codec12.prototype.decodeBody = function () {
        this.avl.records = [];
        for (var i = 0; i < this.avl.commands_quantity_1; i++) {
            var commandType = utils_1.convertBytesToInt(this.reader.ReadBytes(1));
            if (commandType === 5) {
                // Command message structure
                var commandSize = utils_1.convertBytesToInt(this.reader.ReadBytes(4));
                var command = '';
                for (var i_1 = 0; i_1 < commandSize; i_1++) {
                    command += utils_1.convertHexToAscii(this.reader.ReadBytes(1));
                }
                console.log('command: ', command);
            }
            if (commandType === 6) {
                // Response message structure
                var responseSize = utils_1.convertBytesToInt(this.reader.ReadBytes(4));
                var response = '';
                for (var i_2 = 0; i_2 < responseSize; i_2++) {
                    response += utils_1.convertHexToAscii(this.reader.ReadBytes(1));
                }
                console.log('response: ', response);
            }
        }
    };
    return Codec12;
}(base_cfcogm_1.BaseCfcogm));
exports.Codec12 = Codec12;
