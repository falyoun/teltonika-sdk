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
