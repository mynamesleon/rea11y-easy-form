import isDate from './isDate';

describe('isDate', () => {
  it.each([
    new Date(),
    // @ts-ignore
    new Date([2014, 2, 15]),
    new Date('2014-03-15'),
    '2020/02/29',
    '2022-10-10',
    '2022-10',
  ])('returns true for %s', (date) => {
    expect(isDate(date)).toBe(true);
  });

  it.each([
    '',
    '15072002',
    // @ts-ignore
    null,
    // @ts-ignore
    undefined,
    // @ts-ignore
    { year: 2002, month: 7, day: 15 },
    // @ts-ignore
    {
      toString() {
        return '[object Date]';
      },
    }, // faking
    '2021-04-32',
    // @ts-ignore
  ])('returns false for %s', (date) => {
    expect(isDate(date)).toBe(false);
  });
});
