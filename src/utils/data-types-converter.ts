export const convertBytesToInt = (
  bytes: Buffer,
  numeralSystem: BufferEncoding = 'hex',
  radix = 16,
) => <number>parseInt(bytes.toString(numeralSystem), radix);
export const convertBytesToAscii = (
  bytes: Buffer,
  numeralSystem: BufferEncoding = 'utf-8',
) => <string>bytes.toString(numeralSystem);
export const convertHexToAscii = (
  hexString: string,
  numeralSystem: BufferEncoding = 'hex',
) => <string>Buffer.from(hexString, numeralSystem).toString('utf-8');
export const convertAsciiToBinary = (asciiString: string, radix = 2) =>
  asciiString.split('').map((char) => char.charCodeAt(0).toString(radix));
export const isSpecificBitSet = (bitIndex: number, buff: Buffer) =>
  buff[~~(bitIndex / 8)] & Math.pow(2, 7 - (bitIndex % 8));

// ~~(bitIndex / 8) ====> Byte Index
// buff[~~(bitIndex / 8)] ===> required byte
// bitIndex % 8 ====> bit index within the specified byte
