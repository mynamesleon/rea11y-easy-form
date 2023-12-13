import isAlphaNumeric from './isAlphaNumeric';

describe('isAlphaNumeric', () => {
  it.each(['abc123', 'ABC11'])('returns true for %s', (str) => {
    expect(isAlphaNumeric(str)).toBe(true);
  });

  it.each(['abc ', 'foo!!', 'ÄBC', 'FÜübar', 'Jön'])(
    'returns false for %s',
    (str) => {
      expect(isAlphaNumeric(str)).toBe(false);
    }
  );
});
