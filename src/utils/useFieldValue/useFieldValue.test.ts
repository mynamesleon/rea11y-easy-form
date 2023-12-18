import { useFormState } from 'react-final-form';
import useFieldValue from './useFieldValue';
import { renderHook } from '@testing-library/react';

jest.mock('react-final-form', () => ({
  useFormState: jest.fn(),
}));

describe('useFieldValue', () => {
  const mockValues = {
    test1: 'test1',
    test2: 'test2',
    deep: {
      example: {
        test: 'test3',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormState as any).mockReturnValue({ values: mockValues });
  });

  it('gets form values normally using `useFormState` subscribing only to form values', () => {
    renderHook(() => useFieldValue('test1'));
    expect(useFormState).toHaveBeenCalledWith({
      subscription: { values: true },
    });
  });

  it('returns a single value from the FormState when passed a single string', () => {
    const { result } = renderHook(() => useFieldValue('test1'));
    expect(result.current).toBe('test1');
  });

  it('works for deep values in the FormState', () => {
    const { result } = renderHook(() => useFieldValue('deep.example.test'));
    expect(result.current).toBe('test3');
  });

  it('returns an array of field values when passed an array of field names', () => {
    const { result } = renderHook(() =>
      useFieldValue(['test1', 'test2', 'deep.example.test'])
    );
    expect(result.current).toStrictEqual(['test1', 'test2', 'test3']);
  });

  it('takes a `parse` option function to map the result', () => {
    const { result } = renderHook(() =>
      useFieldValue('test1', { parse: (value) => value + value })
    );
    expect(result.current).toBe('test1test1');
  });

  it('passes the whole result to the `parse` function (rather than individual values)', () => {
    const parse = jest.fn((value) => value);
    renderHook(() =>
      useFieldValue(['test1', 'test2', 'deep.example.test'], { parse })
    );
    expect(parse).toHaveBeenCalledWith(['test1', 'test2', 'test3']);
  });

  it('handles `parse` not being a function, and returns the value unaltered', () => {
    const { result } = renderHook(() =>
      useFieldValue('test1', { parse: 'test' as any })
    );
    expect(result.current).toBe('test1');
  });

  it('does a shallow value comparison for the result by default', () => {
    const parse = jest.fn((value) => value);
    const { result, rerender } = renderHook((name: string = 'deep') =>
      useFieldValue(name, { parse })
    );
    expect(result.current).toStrictEqual({ example: { test: 'test3' } });
    // re-mock, and return a new object to ensure reference has changed
    (useFormState as any).mockReturnValue({ values: { ...mockValues } });
    rerender('deep');
    // check that parse was called again
    expect(parse).toHaveBeenCalledTimes(2);
  });

  it('takes a `deep` option to do a deep object comparison, and return the same value across re-renders', () => {
    const parse = jest.fn((value) => value);
    const { rerender } = renderHook((name: string = 'deep') =>
      useFieldValue(name, { parse, deep: true })
    );
    // re-mock, and return a new object to ensure reference has changed
    (useFormState as any).mockReturnValue({ values: { ...mockValues } });
    rerender('deep');
    // check that parse was only called once this time
    expect(parse).toHaveBeenCalledTimes(1);
  });

  it('does a deep comparison by default when passed an array of field names', () => {
    const parse = jest.fn((value) => value);
    const { rerender } = renderHook((names: string[] = ['test1', 'deep']) =>
      useFieldValue(names, { parse, deep: true })
    );
    // re-mock, and return a new object to ensure reference has changed
    (useFormState as any).mockReturnValue({ values: { ...mockValues } });
    rerender(['test1', 'deep']);
    // check that parse was only called once this time
    expect(parse).toHaveBeenCalledTimes(1);
  });
});
