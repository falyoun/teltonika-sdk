/**
 * Codec12 is the original and main Teltonika protocol for device-server communication over GPRS messages.
 * Codec12 GPRS commands can be used for sending configuration, debug, digital outputs control commands or other (special purpose command on special firmware versions).
 * This protocol is also necessary for using FMB630/FM6300/FM5300/FM5500/FM4200 features like: Garmin, LCD communication, COM TCP Link Mode.
 */
import { Codec } from '../../codec';
import { convertBytesToInt, convertHexToAscii } from '../../../utils';

export class Codec12 extends Codec {

  constructor(reader, number_of_records: number) {
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
      let command = '';
      for (let i = 0; i < commandSize; i++) {
        command += convertHexToAscii(this.reader.ReadBytes(1));
      }
      console.log('command: ', command);
    }


    if (commandType === 6) {
      // Response message structure
      const responseSize = convertBytesToInt(this.reader.ReadBytes(4));
      let response = '';
      for(let i = 0; i < responseSize; i++) {
        response += convertHexToAscii(this.reader.ReadBytes(1));
      }
      console.log('response: ', response);
    }
  }

  get avl(): any {
    return super.avl;
  }
}