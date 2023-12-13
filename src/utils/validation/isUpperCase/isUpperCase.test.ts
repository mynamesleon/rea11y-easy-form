import isUpperCase from './isUpperCase';

describe('isUpperCase', () => {
  it.each(['ABC', 'ABC123', 'ALL CAPS IS FUN.', '   .'])(
    'returns true for %s',
    (value) => {
      expect(isUpperCase(value)).toBe(true);
    }
  );

  it.each(['fooBar', '123abc', null, undefined, 0, {}, []])(
    'returns false for %s',
    (value) => {
      expect(isUpperCase(value)).toBe(false);
    }
  );
});
