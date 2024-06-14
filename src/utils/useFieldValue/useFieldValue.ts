import { useMemo, useRef } from 'react';
import { useDeepCompareMemo } from '@react-hookz/web';
import { isEqual } from '@react-hookz/deep-equal';
import { useFormState } from 'react-final-form';
import { getIn } from 'final-form';

type UseFieldValueNameOrNames = string | string[] | null;
type UseFieldValueOptions = {
  parse?: (value: any) => any;
  deep?: boolean;
};

const DEFAULT_OPTIONS: UseFieldValueOptions = {
  parse: (value: any) => value,
  deep: false,
};

const parseValues = (
  values: any,
  returnArray: boolean,
  parse?: (values: any) => any
) => {
  const valuesToParse = returnArray ? values : values?.[0];
  return typeof parse === 'function' ? parse(valuesToParse) : valuesToParse;
};

const useFieldValue = (
  nameOrNames?: UseFieldValueNameOrNames,
  options?: UseFieldValueOptions
): any | any[] => {
  const nameIsArray = Array.isArray(nameOrNames);
  const { deep, parse } = { ...DEFAULT_OPTIONS, ...options };
  const { values } = useFormState({
    subscription: { values: true },
  });
  const namesArr = useDeepCompareMemo(
    () => (nameIsArray ? nameOrNames : [nameOrNames]),
    [nameIsArray, nameOrNames]
  );
  const fieldValues: any[] = useMemo(
    () => namesArr.map((name) => getIn(values, name as string)),
    [namesArr, values]
  );

  const previousValues = useRef<any[]>(fieldValues);
  const parsedValues = useRef<any>();
  if (!parsedValues.current) {
    parsedValues.current = parseValues(fieldValues, nameIsArray, parse);
  }

  const valuesChanged = useMemo(() => {
    const doDeepComparison = deep || nameIsArray;
    const hasChanged = doDeepComparison
      ? !isEqual(fieldValues, previousValues.current)
      : fieldValues !== previousValues.current;

    if (hasChanged) {
      previousValues.current = fieldValues;
    }
    return hasChanged;
  }, [deep, nameIsArray, fieldValues]);

  // doing the parsing in a separate useMemo in case the
  // `parse` option is passed in as an inline function,
  // which would cause extra re-renders
  // and potentially additional deep object comparisons
  // if this was done in the `useMemo` above
  return useMemo(() => {
    if (valuesChanged) {
      parsedValues.current = parseValues(fieldValues, nameIsArray, parse);
    }
    return parsedValues.current;
  }, [parse, nameIsArray, fieldValues, valuesChanged]);
};

export default useFieldValue;
