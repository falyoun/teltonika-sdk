/**
 * 24-hour SMS is usually sent once every day and contains GPS data of last 24 hours.
 * TP-DCS field of this SMS should indicate that message contains 8-bit data (i.e. TP-DCS can be 0x04).
 * Note, that 24 position data protocol is used only with subscribed SMS. Event SMS use standard AVL data protocol.
 */
import { BinaryReader } from '@app/binary-data-handler';
import { convertBytesToInt } from '@app/utils';

export class SmsDataProtocol {
  _reader: BinaryReader;
  constructor(reader: BinaryReader) {
    this._reader = reader;
  }
  /**
   *** Encoding
   To be able to compress 24 GPS data entries into one SMS (140 octets),
   the data is encoded extensively using bit fields.
   Data packet can be interpreted as a bit stream, where all bits are numbered as follows:
   Byte1: 0-7, Byte2: 8-15, Byte3: 16-24 etc..

   -- Bits in a byte are numbered starting from least significant bit. A field of 25 bits would consist of bits 0 to 24 where 0 is the least significant bit and bit 24 – most significant bit.
   */

  public parseTcpPacket() {
    this._decodeHeader();
    this._decodeBody();
    this._decodeFooter();
  }

  private _decodeHeader() {
    const codecId = convertBytesToInt(this._reader.readBytes(1));
    const timestamps = convertBytesToInt(this._reader.readBytes(5));
    const elementCount = convertBytesToInt(this._reader.readBytes(1));
  }

  private _decodeBody() {}

  private _decodeFooter() {}
}
