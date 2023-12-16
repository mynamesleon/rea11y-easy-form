import { getIn } from 'final-form';
import { useCallback, useMemo, useRef } from 'react';
import { useFormState } from 'react-final-form';
import { isEqual } from '@react-hookz/deep-equal';
import { useDeepCompareMemo } from '@react-hookz/web';

type UseFieldValueNameOrNames = string | string[] | null;
type UseFieldValueOptions = {
  parse?: (value: any) => any;
  deep: boolean;
};

const DEFAULT_OPTIONS: UseFieldValueOptions = {
  parse: (value: any) => value,
  deep: false,
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
    () => (Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames]),
    [nameOrNames]
  );
  const fieldValues: any[] = useMemo(
    () => namesArr.map((name) => getIn(values, name as string)),
    [namesArr, values]
  );

  const previousValues = useRef<any[]>();
  const setPreviousValuesRef = useCallback(
    (values: any[]) => (previousValues.current = parse?.(values) ?? values),
    [parse]
  );
  if (!previousValues.current) {
    setPreviousValuesRef(fieldValues);
  }

  return useMemo(() => {
    const doDeepComparison = deep || nameIsArray;
    const valuesChanged = doDeepComparison
      ? !isEqual(fieldValues, previousValues.current)
      : fieldValues !== previousValues.current;
    if (valuesChanged) {
      setPreviousValuesRef(fieldValues);
    }
    if (nameIsArray) {
      return previousValues.current;
    }
    return previousValues.current?.[0];
  }, [fieldValues, deep, nameIsArray, setPreviousValuesRef]);
};

export default useFieldValue;
