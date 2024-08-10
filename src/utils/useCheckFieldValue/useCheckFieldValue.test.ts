import { useFormState } from 'react-final-form';
import useCheckFieldValue from './useCheckFieldValue';
import { renderHook } from '@testing-library/react';
import { UseCheckFieldValueConfig } from './useCheckFieldValue.types';

jest.mock('react-final-form', () => ({
  useFormState: jest.fn(),
  useForm: jest.fn(() => ({ formApi: true })),
}));

describe('useCheckFieldValue', () => {
  const mockValues = {
    first: 'first',
    second: 'second',
    'grand-parent': {
      child: 'child',
      parent: {
        'grand-child': ['complex', 'value', 1],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormState as any).mockReturnValue({ values: mockValues });
  });

  it('returns true when passed no arguments', () => {
    const { result } = renderHook(() => useCheckFieldValue());
    expect(result.current).toBe(true);
  });

  it.each([
    {
      if: {
        first: 'first',
      },
    },
    {
      // all match
      if: {
        first: 'first',
        'grand-parent.parent.grand-child': ['complex', 'value', 1],
      },
      ifNot: {
        second: 'third',
      },
    },
    {
      if: {
        first: 'second',
        second: 'third',
      },
      ifLogic: 'OR' as const,
      ifNot: {
        'grand-parent.child': 'child', // only match
        'grand-parent.parent.grand-child': 'grand-child',
      },
      ifNotLogic: 'OR' as const,
      logic: 'OR' as const,
    },
    {
      if: {
        first: (value: string) => value?.toUpperCase() === 'FIRST', // matches
        second: 'third', // does not match
      },
      ifLogic: 'OR' as const,
      // matches
      ifNot: {
        'grand-parent.child': 'not this',
        'grand-parent.parent.grand-child': 'grand child',
      },
    },
  ])(
    'returns true in exected true case %#',
    (args: UseCheckFieldValueConfig) => {
      const { result } = renderHook(() => useCheckFieldValue(args));
      expect(result.current).toBe(true);
    }
  );

  it.each([
    {
      if: {
        first: 'first', // matches
        second: 'third', // does not match
      },
    },
    {
      if: {
        first: 'first',
      },
      ifNot: {
        second: 'second',
      },
    },
    {
      if: {
        first: 'second',
        second: 'third',
      },
      ifLogic: 'OR' as const,
      ifNot: {
        'grand-parent.child': 'child',
        'grand-parent.parent.grand-child': ['complex', 'value', 1],
      },
      ifNotLogic: 'OR' as const,
      logic: 'OR' as const,
    },
  ])(
    'returns false in expected false case %#',
    (args: UseCheckFieldValueConfig) => {
      const { result } = renderHook(() => useCheckFieldValue(args));
      expect(result.current).toBe(false);
    }
  );

  it('works when provided name and value arguments', () => {
    const { result } = renderHook(() =>
      useCheckFieldValue('grand-parent.child', 'child')
    );
    expect(result.current).toBe(true);

    const { result: result2 } = renderHook(() =>
      useCheckFieldValue('grand-parent.child', 'not-correct')
    );
    expect(result2.current).toBe(false);
  });

  it('works for deep value comparisons', () => {
    const { result } = renderHook(() =>
      useCheckFieldValue('grand-parent.parent.grand-child', [
        'complex',
        'value',
        1,
      ])
    );
    expect(result.current).toBe(true);

    const { result: result2 } = renderHook(() =>
      useCheckFieldValue('grand-parent.parent.grand-child', 'not-correct')
    );
    expect(result2.current).toBe(false);
  });

  it('takes a value prop as a function, which receives the named field value and the FormApi', () => {
    const mockValueFn = jest.fn();
    renderHook(() => useCheckFieldValue('grand-parent.child', mockValueFn));
    expect(mockValueFn).toHaveBeenCalledWith(
      'child',
      expect.objectContaining({ formApi: true })
    );
  });
});
