import isHexColor from './isHexColor';

describe('isHexColor', () => {
  it.each(['#ff0000ff', '#ff0034', '#CCCCCC', '0f38', 'fff', '#f00'])(
    'returns true for %s',
    (color) => {
      expect(isHexColor(color)).toBe(true);
    }
  );

  it.each(['', undefined, null, 123, '#ff', 'fff0a', '#ff12FG'])(
    'returns false for %s',
    (color) => {
      expect(isHexColor(color)).toBe(false);
    }
  );
});
