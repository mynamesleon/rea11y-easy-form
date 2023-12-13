import { renderHook } from '@testing-library/react';
import useAutoId from './useAutoId';

describe('useAutoId', () => {
  it('incrememnts the number by 1 for each call', () => {
    const { result } = renderHook(useAutoId);
    expect(result.current.endsWith('__1')).toBe(true);
    const { result: result2 } = renderHook(useAutoId);
    expect(result2.current.endsWith('__2')).toBe(true);
  });

  it('does not change on re-renders', () => {
    const { result, rerender } = renderHook(useAutoId);
    const start = result.current;
    rerender();
    const end = result.current;
    expect(start).toBe(end);
  });

  it('uses the string `element` in the returned string by default', () => {
    const { result } = renderHook(useAutoId);
    expect(result.current.includes('element')).toBe(true);
  });

  it('takes an argument to use in the returned string instead of `element`', () => {
    const suffix = 'testing';
    const { result } = renderHook(() => useAutoId(suffix));
    expect(result.current.includes(suffix)).toBe(true);
    expect(result.current.includes('element')).toBe(false);
  });
});
