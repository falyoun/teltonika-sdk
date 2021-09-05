/**
 * Codec13 is original Teltonika protocol for device-server communication over GPRS messages and it is based on Codec12 protocol.
 * Main differences of Codec13 are that timestamp is using in messages and communication is one way only (Codec13 is used for Device -> Server sending).
 */
import { convertBytesToInt, convertHexToAscii } from '@app/utils';
import {
  BaseCodec,
  tcpCFCOGMPacketBody,
  tcpCFDDSPacketBody,
} from '@app/codecs';
export class Codec13 extends BaseCodec {
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
        const timestamp = new Date(convertBytesToInt(this.reader.readBytes(4)));
        console.log('timestamp: ', timestamp);
        let command = '';
        for (let i = 0; i < commandSize; i++) {
          command += convertHexToAscii(this.reader.readBytes(1) as any);
        }
        console.log('command: ', command);
        body = {
          command,
          commandType,
          commandSize,
        };
      }
    }

    return body;
  }
}
