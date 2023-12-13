import isNullOrUndefined from './isNullOrUndefined';

describe('isNullOrUndefined', () => {
  it(`returns true if the provided arg is null or undefined`, () => {
    expect(isNullOrUndefined()).toBe(true);
    expect(isNullOrUndefined(null)).toBe(true);
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it(`returns false if the provided arg is not null or undefined`, () => {
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined('')).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
    expect(isNullOrUndefined(() => {})).toBe(false);
  });
});
