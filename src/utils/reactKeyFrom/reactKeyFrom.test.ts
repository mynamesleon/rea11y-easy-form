import reactKeyFrom from './reactKeyFrom';

describe('reactKeyFrom', () => {
  it('returns (as a string) the first argument that is not null, undefined, or an empty string', () => {
    expect(reactKeyFrom()).toBe(undefined);
    expect(reactKeyFrom('', null, undefined, 0, 'ten')).toBe(String(0));
    expect(reactKeyFrom(null, {})).toBe(String({}));
  });
});
