import useConstant from 'use-constant';
import { useMemo, useCallback } from 'react';
import {
  ARRAY_ERROR,
  fieldSubscriptionItems,
  type FieldValidator,
  type FieldSubscription,
} from 'final-form';
import { useForm } from 'react-final-form';
import arrayMutators, { type Mutators } from 'final-form-arrays';
import type {
  FieldArrayRenderProps,
  UseFieldArrayConfig,
} from './useFieldArray.types';
import useMutatedField from '../useMutatedField';

const ALL_SUBSCRIPTION: FieldSubscription = fieldSubscriptionItems.reduce(
  (result, key) => {
    result[key] = true;
    return result;
  },
  {}
);

const fieldArrayIsEqual = (aArray: any[], bArray: any[]) =>
  aArray === bArray ||
  (Array.isArray(aArray) &&
    Array.isArray(bArray) &&
    aArray.length === bArray.length &&
    !aArray.some((a, index) => a !== bArray[index]));

const NO_FORMAT = (value: any) => value;

const useFieldArray = (
  name: string,
  config: UseFieldArrayConfig<any> = {},
  useFieldHook = useMutatedField
): FieldArrayRenderProps<any> => {
  const { mutators: formMutators } = useForm('useFieldArray');
  const hasMutators = !!(formMutators && formMutators.push && formMutators.pop);
  if (!hasMutators) {
    throw new Error('Your form requires the mutators from final-form-arrays');
  }

  // curry the field name onto all mutator calls
  const mutators = useMemo(() => {
    return Object.keys(arrayMutators as unknown as Mutators).reduce(
      (acc, key) => {
        acc[key] = (...args: any[]) => formMutators[key](name, ...args);
        return acc;
      },
      {}
    );
  }, [name, formMutators]);

  const { validate: validateProp } = config;
  const validate: FieldValidator<any> = useConstant(
    () => (value, allValues, meta) => {
      if (!validateProp) {
        return;
      }
      const error = validateProp(value, allValues, meta);
      if (!error || Array.isArray(error)) {
        return error;
      } else {
        const arrayError = [];
        arrayError[ARRAY_ERROR] = error;
        return arrayError;
      }
    }
  );

  const subscription = {
    ...(config.subscription || ALL_SUBSCRIPTION),
    length: true,
    value: true,
  };

  const {
    meta: { length, ...meta },
    input,
    ...fieldState
  } = useFieldHook(name, {
    isEqual: fieldArrayIsEqual,
    format: NO_FORMAT,
    ...config,
    subscription,
    validate,
  });

  const forEach = useCallback(
    (iterator: (name: string, index: number) => void): void => {
      const len = length || 0;
      for (let i = 0; i < len; i += 1) {
        iterator(`${name}[${i}]`, i);
      }
    },
    [length, name]
  );

  const map = useCallback(
    (iterator: (name: string, index: number) => any): any[] => {
      const len = length || 0;
      const results: any[] = [];
      for (let i = 0; i < len; i += 1) {
        results.push(iterator(`${name}[${i}]`, i));
      }
      return results;
    },
    [length, name]
  );

  const fields = useMemo(
    () => ({
      ...fieldState,
      ...mutators,
      length: length || 0,
      value: input.value,
      forEach,
      name,
      map,
    }),
    [name, forEach, length, map, mutators, fieldState, input.value]
  );

  return {
    input: fields,
    fields,
    meta,
  } as FieldArrayRenderProps<any>;
};

export default useFieldArray;
