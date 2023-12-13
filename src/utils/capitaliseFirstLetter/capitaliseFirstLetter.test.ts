import capitaliseFirstLetter from './capitaliseFirstLetter';

describe('capitaliseFirstLetter', () => {
  it.each([
    ['test', 'Test'],
    ['1234abcd', '1234abcd'],
    ['lorem ipsum dolor', 'Lorem ipsum dolor'],
  ])(
    `capitalises the first letter in a string`,
    (str: string, expected: string) => {
      expect(capitaliseFirstLetter(str)).toBe(expected);
    }
  );

  it.each([null, undefined, {}, [], ['string in here'], 1234, () => {}])(
    'returns an empty string when it receives non-string values',
    (arg: any) => {
      expect(capitaliseFirstLetter(arg)).toBe('');
    }
  );
});
