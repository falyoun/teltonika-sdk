import { CodecsTypesEnum } from '@app/codecs';

export const checkCodecType = (
  toTest: CodecsTypesEnum,
  target: CodecsTypesEnum,
) => {
  if (toTest !== target) {
    throw {
      message: `Codec is of type ${target} but received ${toTest}`,
      error: 'Mis-match type',
    };
  }
};

export const calculateCRC = (
  buffer,
  offset = 0,
  polynom = 0xa001,
  preset = 0,
) => {
  preset &= 0xffff;
  polynom &= 0xffff;

  let crc = preset;
  for (let i = 0; i < buffer.length; i++) {
    const data = buffer[(i + offset) % buffer.length] & 0xff;
    crc ^= data;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x0001) != 0) {
        crc = (crc >> 1) ^ polynom;
      } else {
        crc = crc >> 1;
      }
    }
  }
  return crc & 0xffff;
};
