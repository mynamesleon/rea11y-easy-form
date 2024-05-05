import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-final-form';
import { MUTATOR_SET_FIELD_DATA_KEY as SET_FIELD_DATA } from '../constants';

const NOOP = () => {};

export const useSetFieldData = (name?: string, data?: any, deps?: any[]) => {
  const { setFieldData } = useFieldData();
  useEffect(() => {
    if (name) {
      setFieldData(name, data || {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, setFieldData, ...(Array.isArray(deps) ? deps : [data])]);
  return setFieldData;
};

const useFieldData = () => {
  const { getFieldState, mutators: { [SET_FIELD_DATA]: setFieldData } = {} } =
    useForm('useFieldData');

  const getFieldDataFn = useCallback(
    (name: string, key?: string) => {
      const { data = {} } = getFieldState(name) || {};
      if (key) {
        return data[key];
      }
      return data;
    },
    [getFieldState]
  );

  const setFieldDataFn =
    typeof setFieldData === 'function' ? setFieldData : NOOP;

  return useMemo(
    () => ({
      getFieldData: getFieldDataFn,
      setFieldData: setFieldDataFn,
    }),
    [getFieldDataFn, setFieldDataFn]
  );
};

export default useFieldData;
