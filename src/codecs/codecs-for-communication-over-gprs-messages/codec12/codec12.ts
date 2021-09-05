/**
 * Codec12 is the original and main Teltonika protocol for device-server communication over GPRS messages.
 * Codec12 GPRS commands can be used for sending configuration, debug, digital outputs control commands or other (special purpose command on special firmware versions).
 * This protocol is also necessary for using FMB630/FM6300/FM5300/FM5500/FM4200 features like: Garmin, LCD communication, COM TCP Link Mode.
 */
import {
  checkCodecType,
  convertBytesToInt,
  convertHexToAscii,
} from '@app/utils';
import {
  BaseCodec,
  tcpCFCOGMPacketBody,
  tcpCFDDSPacketBody,
} from '@app/codecs';

export class Codec12 extends BaseCodec {
  constructor(reader) {
    super(reader);
  }

  decodeAvlPacket(): tcpCFCOGMPacketBody | Array<tcpCFDDSPacketBody> {
    const numberOfRecords1 = convertBytesToInt(this.reader.readBytes(1));
    let body = {} as tcpCFCOGMPacketBody;
    for (let i = 0; i < numberOfRecords1; i++) {
      const commandType = convertBytesToInt(this.reader.readBytes(1));
      if (commandType === 5) {
        // Command message structure
        const commandSize = convertBytesToInt(this.reader.readBytes(4));
        let command = '';
        for (let i = 0; i < commandSize; i++) {
          command += convertHexToAscii(this.reader.readBytes(1) as any);
        }
        console.log('command: ', command);
        body = {
          command,
          commandSize,
          commandType,
        };
      }

      if (commandType === 6) {
        // Response message structure
        const responseSize = convertBytesToInt(this.reader.readBytes(4));
        let response = '';
        for (let i = 0; i < responseSize; i++) {
          response += convertHexToAscii(this.reader.readBytes(1) as any);
        }
        console.log('response: ', response);
        body = {
          command: response,
          commandSize: responseSize,
          commandType,
        };
      }
    }
    return body;
  }
}
