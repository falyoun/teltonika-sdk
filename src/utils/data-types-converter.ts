export const convertBytesToInt = (bytes: Buffer, numeralSystem: BufferEncoding = 'hex', radix = 16) => <number> (parseInt(bytes.toString(numeralSystem), radix));
export const convertBytesToAscii = (bytes: Buffer, numeralSystem: BufferEncoding = 'utf-8') => <string> bytes.toString(numeralSystem)
export const convertHexToAscii = (hexString: string, numeralSystem: BufferEncoding = 'hex') => <string> Buffer.from(hexString, numeralSystem).toString("utf-8")
