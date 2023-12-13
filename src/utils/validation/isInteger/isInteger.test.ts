import isInteger from './isInteger';

describe('isInteger', () => {
  it.each(['13', '123', '0', '-0', '+1', '01', '-01', '000', 13, 0])(
    'returns true for %s',
    (value) => {
      expect(isInteger(value)).toBe(true);
    }
  );

  it.each(['100e10', '123.123', '   ', '', undefined, null])(
    'returns false for %s',
    (value) => {
      expect(isInteger(value)).toBe(false);
    }
  );
});
