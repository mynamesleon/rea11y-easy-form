import isEmpty from './isEmpty';

describe('isEmpty validation', () => {
  it('should return `true` if empty', () => {
    expect(isEmpty()).toStrictEqual(true);
    expect(isEmpty(null)).toStrictEqual(true);
    expect(isEmpty(undefined)).toStrictEqual(true);
    expect(isEmpty('')).toStrictEqual(true);
    expect(isEmpty(' ')).toStrictEqual(true); // handle white-space strings
    expect(isEmpty({})).toStrictEqual(true);
    expect(isEmpty([])).toStrictEqual(true);
    expect(isEmpty(false)).toStrictEqual(true); // boolean check
  });

  it('should return `false` for "meaningful" values', () => {
    expect(isEmpty(() => null)).toStrictEqual(false);
    expect(isEmpty('test')).toStrictEqual(false);
    expect(isEmpty('  test    ')).toStrictEqual(false);
    expect(isEmpty({ test: 'test' })).toStrictEqual(false);
    expect(isEmpty(['test'])).toStrictEqual(false);
    expect(isEmpty(true)).toStrictEqual(false); // boolean check
  });

  it('should handle arrays', () => {
    expect(isEmpty([])).toStrictEqual(true);
    expect(isEmpty([0])).toStrictEqual(false);
    // check that something array-like is not treated as an array
    expect(isEmpty({ length: 0 })).toStrictEqual(false);
  });
});
