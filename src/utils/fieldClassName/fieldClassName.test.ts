import fieldClassName from './fieldClassName';
import { CLASS_PREFIX } from '../constants';

describe('fieldClassName', () => {
  it(`returns ${CLASS_PREFIX} if no argument is provided`, () => {
    expect(fieldClassName()).toBe(CLASS_PREFIX);
  });

  it('takes an argument to add as the class suffix', () => {
    const suffix = 'suffix';
    const result = fieldClassName(suffix);
    expect(result).toContain(CLASS_PREFIX);
    expect(result.endsWith(suffix)).toBe(true);
  });

  it('lowercases the suffix', () => {
    const suffix = 'SUFFIX';
    const result = fieldClassName(suffix);
    expect(result.endsWith(suffix)).toBe(false);
    expect(result.endsWith(suffix.toLowerCase())).toBe(true);
  });
});
