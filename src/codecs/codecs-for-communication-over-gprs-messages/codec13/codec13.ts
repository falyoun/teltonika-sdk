/**
 * Codec13 is original Teltonika protocol for device-server communication over GPRS messages and it is based on Codec12 protocol.
 * Main differences of Codec13 are that timestamp is using in messages and communication is one way only (Codec13 is used for Device -> Server sending).
 */
import { Codec } from '@app/codecs';
import { convertBytesToInt, convertHexToAscii } from '@app/utils';

export class Codec13 extends Codec {

  constructor(reader, number_of_records) {
    super(reader, number_of_records);
  }


  parseHeader() {
    this.avlObj.records = [];
    for (let i = 0; i < this.number_of_records; i++) {
      this.parseAvlRecords();
    }
  }

  parseAvlRecords() {
    const commandType = convertBytesToInt(this.reader.ReadBytes(1));
    if (commandType === 5) {
      // Command message structure
      const commandSize = convertBytesToInt(this.reader.ReadBytes(4));
      const timestamp = new Date(convertBytesToInt(this.reader.ReadBytes(4)));
      let command = '';
      for (let i = 0; i < commandSize; i++) {
        command += convertHexToAscii(this.reader.ReadBytes(1));
      }
      console.log('command: ', command);
    }
  }
}