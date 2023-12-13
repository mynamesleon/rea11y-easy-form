import isNumber from './isNumber';

describe('isNumber', () => {
  it.each([
    '123',
    '00123',
    '-00123',
    '0',
    '-0',
    '+123',
    '123.123',
    '+000000',
    12345,
  ])('returns true for %s', (value) => {
    expect(isNumber(value)).toBe(true);
  });

  it.each(['fooBar', '123A', ' ', '', '.', null, undefined, {}, []])(
    'returns false for %s',
    (value) => {
      expect(isNumber(value)).toBe(false);
    }
  );
});
