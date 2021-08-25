/**
 * Codec13 is original Teltonika protocol for device-server communication over GPRS messages and it is based on Codec12 protocol.
 * Main differences of Codec13 are that timestamp is using in messages and communication is one way only (Codec13 is used for Device -> Server sending).
 */
import { convertBytesToInt, convertHexToAscii } from '@app/utils';
import { BaseCfcogm } from '../base-cfcogm';
export class Codec13 extends BaseCfcogm {

  constructor(reader) {
    super(reader);
  }
  decodeBody() {
    this.avl.records = [];
    for (let i = 0; i < this.avl.commands_quantity_1; i++) {
      const commandType = convertBytesToInt(this.reader.ReadBytes(1));
      if (commandType === 5) {
        // Command message structure
        const commandSize = convertBytesToInt(this.reader.ReadBytes(4));
        const timestamp = new Date(convertBytesToInt(this.reader.ReadBytes(4)));
        console.log('timestamp: ', timestamp)
        let command = '';
        for (let i = 0; i < commandSize; i++) {
          command += convertHexToAscii(this.reader.ReadBytes(1));
        }
        console.log('command: ', command);
      }
    }
  }
}