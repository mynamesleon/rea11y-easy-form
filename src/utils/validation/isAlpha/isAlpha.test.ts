import isAlpha from './isAlpha';

describe('isAlpha', () => {
  it.each(['abc', 'ABC', 'FoObar'])('returns true for %s', (str) => {
    expect(isAlpha(str)).toBe(true);
  });

  it.each(['abc1', '', 'ÄBC', 'FÜübar', 'Jön', 'Heiß'])(
    'returns false for %s',
    (str) => {
      expect(isAlpha(str)).toBe(false);
    }
  );
});
