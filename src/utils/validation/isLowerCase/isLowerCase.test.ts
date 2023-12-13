import isLowerCase from './isLowerCase';

describe('isLowerCase', () => {
  it.each(['abc', 'abc123', 'this is lowercase.', 'tr竪s 端ber'])(
    'returns true for %s',
    (value) => {
      expect(isLowerCase(value)).toBe(true);
    }
  );

  it.each(['fooBar', '123A', null, undefined, 0, {}, []])(
    'returns false for %s',
    (value) => {
      expect(isLowerCase(value)).toBe(false);
    }
  );
});
