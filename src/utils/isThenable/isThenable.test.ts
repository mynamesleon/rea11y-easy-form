import isThenable from './isThenable';

describe('isThenable', () => {
  const fnWithThen = () => {};
  fnWithThen.then = () => {};

  it.each([
    [null, false],
    [undefined, false],
    [0, false],
    [-42, false],
    [42, false],
    ['', false],
    ['then', false],
    [false, false],
    [true, false],
    [{}, false],
    [{ then: true }, false],
    [[], false],
    [[true], false],
    [() => {}, false],
    [{ then: function () {} }, true],
    [fnWithThen, true],
    [new Promise((resolve) => resolve('test')), true],
    [Promise.resolve('test'), true],
  ])(
    'returns a boolean indicating if value %s is thenable',
    (val, expected) => {
      expect(isThenable(val)).toBe(expected);
    }
  );
});
