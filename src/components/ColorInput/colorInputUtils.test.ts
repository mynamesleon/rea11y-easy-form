import { convertToColorHex } from './colorInputUtils';

describe('colorInputUtils', () => {
  describe('convertToColorHex', () => {
    it('returns an empty string if the value is falsy, is not a string, or trims to an empty string', () => {
      expect(convertToColorHex()).toStrictEqual('');
      expect(convertToColorHex(null as any)).toStrictEqual('');
      expect(convertToColorHex('')).toStrictEqual('');
      expect(convertToColorHex('    ')).toStrictEqual('');
      expect(convertToColorHex(0 as any)).toStrictEqual('');
      expect(convertToColorHex({} as any)).toStrictEqual('');
      expect(convertToColorHex([] as any)).toStrictEqual('');
    });

    it('returns full color hex values uppercased', () => {
      expect(convertToColorHex('#abcdef')).toStrictEqual('#ABCDEF');
    });

    it('handles coverts 3 character hex colors to 6 character ones', () => {
      expect(convertToColorHex('#abc')).toStrictEqual('#AABBCC');
    });

    it('handles color hex values without a hash', () => {
      expect(convertToColorHex('abc')).toStrictEqual('#AABBCC');
      expect(convertToColorHex('123456')).toStrictEqual('#123456');
    });

    it('handles color keywords, regardless of casing or spaces', () => {
      expect(convertToColorHex(' piNK  ')).toStrictEqual('#FFC0CB');
      expect(convertToColorHex('greEn yelLow')).toStrictEqual('#ADFF2F');
    });

    it('returns an empty string for strings that cannot be converted', () => {
      expect(convertToColorHex('test')).toStrictEqual('');
      expect(convertToColorHex('AH')).toStrictEqual('');
    });
  });
});
