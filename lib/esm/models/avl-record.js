"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvlRecord = void 0;
var AvlRecord = /** @class */ (function () {
    function AvlRecord(priority, timestamp, gps, event_id, properties_count, ioElements) {
        this.priority = priority;
        this.timestamp = timestamp;
        this.gps = gps;
        this.event_id = event_id;
        this.properties_count = properties_count;
        this.ioElements = ioElements;
    }
    AvlRecord.prototype.print = function () {
        console.log(this.timestamp);
        console.log('Native elements ->: ');
        console.table({
            priority: this.priority,
            timestamp: this.timestamp,
            eventId: this.event_id,
            prioritiesCount: this.properties_count,
        });
        console.log('Nested element ->:: IoElements ');
        // console.log(this.ioElements)
        // console.log(this.ioElements.length)
        this.ioElements.forEach(function (x) { return console.table(x); });
        console.log('Nested element -> :: gpsElement');
        for (var _i = 0, _a = Object.entries(this.gps); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            console.log("Key: " + key + " :::: Value: " + value);
        }
    };
    return AvlRecord;
}());
exports.AvlRecord = AvlRecord;
