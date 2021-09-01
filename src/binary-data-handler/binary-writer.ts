export class BinaryWriter {
  _byteBuffer: Buffer;
  _endianness: string;
  _encoding: BufferEncoding;
  _length: number;
  constructor(endianness = 'big', encoding: BufferEncoding = 'ascii') {
    this.byteBuffer = Buffer.alloc(0);
    this.endianness = endianness;
    this.encoding = encoding;
    this.length = 0;
  }

  writeUInt8(pValue) {
    const tempBuffer = Buffer.alloc(1);
    tempBuffer.writeUInt8(pValue, 0);
    this.length += 1;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeUInt16(pValue) {
    const tempBuffer = Buffer.alloc(2);
    if (this.endianness == 'little') {
      tempBuffer.writeUInt16LE(pValue, 0);
    } else {
      tempBuffer.writeUInt16BE(pValue, 0);
    }
    this.length += 2;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeUInt32(pValue) {
    const tempBuffer = Buffer.alloc(4);
    if (this.endianness == 'little') {
      tempBuffer.writeUInt32LE(pValue, 0);
    } else {
      tempBuffer.writeUInt32BE(pValue, 0);
    }
    this.length += 4;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeUInt64(pValue) {
    const tempBuffer = Buffer.alloc(8);
    if (this.endianness == 'little') {
      tempBuffer.writeUInt32LE(pValue, 0);
    } else {
      tempBuffer.writeUInt32BE(pValue, 0);
    }
    this.length += 8;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeInt8(pValue) {
    const tempBuffer = Buffer.alloc(1);
    tempBuffer.writeInt8(pValue, 0);
    this.length += 1;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeInt16(pValue) {
    const tempBuffer = Buffer.alloc(2);
    if (this.endianness == 'little') {
      tempBuffer.writeInt16LE(pValue, 0);
    } else {
      tempBuffer.writeInt16BE(pValue, 0);
    }
    this.length += 2;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeInt32(pValue) {
    const tempBuffer = Buffer.alloc(4);
    if (this.endianness == 'little') {
      tempBuffer.writeInt32LE(pValue, 0);
    } else {
      tempBuffer.writeInt32BE(pValue, 0);
    }
    this.length += 4;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeInt64(pValue) {
    const tempBuffer = Buffer.alloc(8);
    if (this.endianness == 'little') {
      tempBuffer.writeInt32LE(pValue, 0);
    } else {
      tempBuffer.writeInt32BE(pValue, 0);
    }
    this.length += 8;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeFloat(pValue) {
    const tempBuffer = Buffer.alloc(4);
    if (this.endianness == 'little') {
      tempBuffer.writeFloatLE(pValue, 0);
    } else {
      tempBuffer.writeFloatBE(pValue, 0);
    }
    this.length += 4;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeDouble(pValue) {
    const tempBuffer = Buffer.alloc(8);
    if (this.endianness == 'little') {
      tempBuffer.writeDoubleLE(pValue, 0);
    } else {
      tempBuffer.writeDoubleBE(pValue, 0);
    }
    this.length += 8;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  writeBytes(value: any) {
    if (typeof value == 'string') {
      const bytesArray = [];
      for (let i = 0; i < value.length; ++i) {
        bytesArray.push(value.charCodeAt(i));
      }
      value = bytesArray;
    }

    // if (!value instanceof Buffer && !value instanceof Array) {
    //   throw new Error('Invalid Buffer object provided.');
    // }

    const tempBuffer = value instanceof Buffer ? value : Buffer.from(value);

    this.length += tempBuffer.length;
    this.byteBuffer = Buffer.concat([this.byteBuffer, tempBuffer], this.length);
  }

  set byteBuffer(value) {
    this._byteBuffer = value;
  }
  get byteBuffer() {
    return this._byteBuffer;
  }

  set endianness(value) {
    this._endianness = value;
  }
  get endianness() {
    return this._endianness;
  }

  set encoding(value) {
    this._encoding = value;
  }
  get encoding() {
    return this._encoding;
  }

  set length(value) {
    this._length = value;
  }
  get length() {
    return this._length;
  }
}
