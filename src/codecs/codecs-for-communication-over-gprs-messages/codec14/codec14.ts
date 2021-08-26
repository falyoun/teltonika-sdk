import { BaseCodec, CodecsTypesEnum } from '@app/codecs';
import {
  checkCodecType,
  convertBytesToInt,
  convertHexToAscii,
} from '@app/utils';

/**
 * Codec14 is original Teltonika protocol for device-server communication over GPRS messages and it is based on Codec12 protocol.
 * Main difference of Codec14 is that, device will answer to GPRS command if device physical IMEI number matches specified IMEI number in GPRS command.
 * Codec14 GPRS commands can be used for sending configuration, debug, digital outputs control commands or other (special purpose command on special firmware versions).
 */
export class Codec14 extends BaseCodec {
  constructor(reader, codecType: CodecsTypesEnum) {
    checkCodecType(codecType, CodecsTypesEnum.COMMUNICATION_OVER_GPRS_CODEC);
    super(reader, codecType);
  }
  protected decodeBody() {
    for (let i = 0; i < this.tcpTeltonikaPacket.header.numberOfRecords1; i++) {
      const messageType = convertBytesToInt(this.reader.ReadBytes(1));
      if (messageType === 5) {
        // Command message structure
        const commandSize = convertBytesToInt(this.reader.ReadBytes(4));
        const imei = convertBytesToInt(this.reader.ReadBytes(8));
        console.log({ imei, commandSize });
        let command = '';
        for (let i = 0; i < commandSize; i++) {
          command += convertHexToAscii(this.reader.ReadBytes(1));
        }
        console.log('command: ', command);
      }
      if (messageType === 6) {
        // Response message structure
        const responseSize = convertBytesToInt(this.reader.ReadBytes(4));
        const imei = convertBytesToInt(this.reader.ReadBytes(8));
        console.log({ imei, responseSize });
        let response = '';
        for (let i = 0; i < responseSize; i++) {
          response += convertHexToAscii(this.reader.ReadBytes(1));
        }
        console.log('response: ', response);
      }
    }
  }
}
