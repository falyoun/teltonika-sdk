export class BinaryReader {
  _byteBuffer: Buffer;
  _endianness: string;
  _encoding: BufferEncoding;
  _length: number;
  _position: number;

  constructor(
    inputBuffer: Buffer | ArrayBuffer,
    endianness = 'big',
    encoding: BufferEncoding = 'ascii',
  ) {
    this.byteBuffer = Buffer.from(inputBuffer);
    this.endianness = endianness;
    this.encoding = encoding;
    this.length = this.byteBuffer.length;
    this.position = 0;
  }

  readUInt8() {
    if (this.byteBuffer.length < 1) {
      return 0;
    }
    const value = this.byteBuffer.readUInt8(0);
    this.byteBuffer = this.byteBuffer.slice(1);
    ++this.position;
    return value;
  }

  readUInt16() {
    if (this.byteBuffer.length < 2) {
      return 0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readUInt16LE(0)
        : this.byteBuffer.readUInt16BE(0);
    this.byteBuffer = this.byteBuffer.slice(2);
    this.position += 2;
    return value;
  }

  readUInt32() {
    if (this.byteBuffer.length < 4) {
      return 0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readUInt32LE(0)
        : this.byteBuffer.readUInt32BE(0);
    this.byteBuffer = this.byteBuffer.slice(4);
    this.position += 4;
    return value;
  }

  readUInt64() {
    if (this.byteBuffer.length < 8) {
      return 0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readUInt32LE(0)
        : this.byteBuffer.readUInt32BE(0);
    this.byteBuffer = this.byteBuffer.slice(8);
    this.position += 8;
    return value;
  }

  readInt8() {
    if (this.byteBuffer.length < 1) {
      return 0;
    }

    const value = this.byteBuffer.readInt8(0);
    this.byteBuffer = this.byteBuffer.slice(1);
    ++this.position;
    return value;
  }

  readInt16() {
    if (this.byteBuffer.length < 2) {
      return 0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readInt16LE(0)
        : this.byteBuffer.readInt16BE(0);
    this.byteBuffer = this.byteBuffer.slice(2);
    this.position += 2;
    return value;
  }

  readInt32() {
    if (this.byteBuffer.length < 4) {
      return 0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readInt32LE(0)
        : this.byteBuffer.readInt32BE(0);
    this.byteBuffer = this.byteBuffer.slice(4);
    this.position += 4;
    return value;
  }

  readInt64() {
    if (this.byteBuffer.length < 8) {
      return 0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readInt32LE(0)
        : this.byteBuffer.readInt32BE(0);
    this.byteBuffer = this.byteBuffer.slice(8);
    this.position += 8;
    return value;
  }

  readFloat() {
    if (this.byteBuffer.length < 4) {
      return 0.0;
    }

    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readFloatLE(0)
        : this.byteBuffer.readFloatBE(0);
    this.byteBuffer = this.byteBuffer.slice(4);
    this.position += 4;
    return value;
  }

  readDouble() {
    if (this.byteBuffer.length < 8) {
      return 0.0;
    }
    const value =
      this.endianness == 'little'
        ? this.byteBuffer.readDoubleLE(0)
        : this.byteBuffer.readDoubleBE(0);
    this.byteBuffer = this.byteBuffer.slice(8);
    this.position += 8;
    return value;
  }

  readBytes(count) {
    if (count > this.byteBuffer.length) {
      return Buffer.alloc(0);
    }
    const buff = Buffer.alloc(count);
    this.byteBuffer.copy(buff, 0, 0, count);
    this.byteBuffer = this.byteBuffer.slice(count);
    this.position += count;
    return buff;
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

  set position(value) {
    this._position = value;
  }
  get position() {
    return this._position;
  }
}
