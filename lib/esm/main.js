"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
var config_1 = require("@nestjs/config");
var fmb_parser_1 = require("./fmb-parser");
var testCodec8 = function () {
    var codec8packet = '000000000000004308020000016B40D57B480100000000000000000000000000000001010101000000000000016B40D5C198010000000000000000000000000000000101010101000000020000252C';
    var buff = Buffer.from(codec8packet, 'hex');
    var fmbParser = new fmb_parser_1.FmbParser(buff);
    var avl = fmbParser.avl;
    // const avlPacket = new AvlPacket(
    //   avl.records,
    //   avl.zero,
    //   avl.data_length,
    //   avl.codec_id,
    //   avl.number_of_data,
    //   avl.number_of_data2,
    //   avl.CRC
    // );
    // console.log(avlPacket);
    for (var i = 0; i < avl.records.length; i++) {
        var avlRecord = avl.records[i];
        console.log(avlRecord);
        // const avlInstance = new AvlRecord(
        //   avlRecord.priority,
        //   avlRecord.timestamp,
        //   avlRecord.gps,
        //   avlRecord.event_id,
        //   avlRecord.properties_count,
        //   avlRecord.ioElements
        // )
        // avlInstance.print();
    }
};
var testCodec16 = function () {
    var codec16Packet = '000000000000005F10020000016BDBC7833000000000000000000000000000000000000B05040200010000030002000B00270042563A00000000016BDBC7871800000000000000000000000000000000000B05040200010000030002000B00260042563A00000200005FB3';
    var buff = Buffer.from(codec16Packet, "hex");
    var parser = new fmb_parser_1.FmbParser(buff);
    console.log(parser.avl);
};
var testCodec12 = function () {
    // Test
    // Sending command to device
    var codec12packet = '000000000000000F0C010500000007676574696E666F0100004312';
    var buff = Buffer.from(codec12packet, 'hex');
    var fmbParser = new fmb_parser_1.FmbParser(buff);
    console.log(fmbParser.avl);
    // Test
    // Getting back response from device
    var codec12FromDevicePacket = '00000000000000900C010600000088494E493A323031392F372F323220373A3232205254433A323031392F372F323220373A3533205253543A32204552523A312053523A302042523A302043463A302046473A3020464C3A302054553A302F302055543A3020534D533A30204E4F4750533A303A3330204750533A31205341543A302052533A332052463A36352053463A31204D443A30010000C78F';
    var buffer = Buffer.from(codec12FromDevicePacket, 'hex');
    var fromDeviceFmbParser = new fmb_parser_1.FmbParser(buffer);
    console.log(fromDeviceFmbParser.avl);
};
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, configService, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    configService = app.get(config_1.ConfigService);
                    port = configService.get('port');
                    return [4 /*yield*/, app.listen(port)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bootstrap()];
            case 1:
                _a.sent();
                console.log('Server is up and running...');
                console.log('---------------------------------------------------------------------------------------------------');
                console.log("Codec 8");
                console.log('---------------------------------------------------------------------------------------------------');
                testCodec8();
                console.log('---------------------------------------------------------------------------------------------------');
                console.log("Codec 16");
                console.log('---------------------------------------------------------------------------------------------------');
                testCodec16();
                console.log('---------------------------------------------------------------------------------------------------');
                console.log("Codec 12");
                console.log('---------------------------------------------------------------------------------------------------');
                testCodec12();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
