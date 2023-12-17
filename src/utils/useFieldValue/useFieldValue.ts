import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useDeepCompareMemo } from '@react-hookz/web';
import { isEqual } from '@react-hookz/deep-equal';
import { useFormState } from 'react-final-form';
import { getIn } from 'final-form';

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
  const valuesChanged = useMemo(() => {
    const doDeepComparison = deep || nameIsArray;
    return doDeepComparison
      ? !isEqual(fieldValues, previousValues.current)
      : fieldValues !== previousValues.current;
  }, [deep, nameIsArray, fieldValues]);

  useEffect(() => {
    if (valuesChanged) {
      setPreviousValuesRef(fieldValues);
    }
  }, [valuesChanged, fieldValues, setPreviousValuesRef]);

  if (nameIsArray) {
    return previousValues.current;
  }
  return previousValues.current?.[0];
};

export default useFieldValue;
