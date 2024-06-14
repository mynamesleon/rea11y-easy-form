import { useCallback, useEffect, useRef } from 'react';
import { REPEATER_ENTRY_KEY, isNullOrUndefined, useAutoId } from '../../utils';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';
import { useRepeaterContext } from './RepeaterContext';
import { useForm } from 'react-final-form';

const isDesiredValueType = (value: any) =>
  typeof value === 'object' &&
  !Array.isArray(value) &&
  !isNullOrUndefined(value);

const useRepeaterFieldsSetup = ({
  length: fieldsLength,
  update: fieldsUpdate,
  value: fieldsValue,
  push: fieldsPush,
}: FieldArrayInput<any>) => {
  const idIndex = useRef<number>(0);
  const { batch } = useForm('Repeater');
  const idPrefix = useAutoId('repeater');

  const customPush = useCallback(
    (value: any) => {
      const index = (idIndex.current += 1);
      const valueToUse = isDesiredValueType(value)
        ? { ...value, [REPEATER_ENTRY_KEY]: `${idPrefix}_${index}` }
        : value;
      fieldsPush(valueToUse);
    },
    [idPrefix, fieldsPush]
  );

  // update initial repeater entries to have a custom key
  useEffect(() => {
    batch(() => {
      fieldsValue.forEach((value, index) => {
        if (isDesiredValueType(value) && !value[REPEATER_ENTRY_KEY]) {
          const key = `${idPrefix}_${(idIndex.current += 1)}`;
          fieldsUpdate(index, {
            ...value,
            [REPEATER_ENTRY_KEY]: key,
          });
        }
      });
    });
  }, [fieldsValue, fieldsUpdate, batch, idPrefix]);

  // populate to minimum number of repeater entries
  const { min, defaultValues } = useRepeaterContext();
  useEffect(() => {
    if (typeof min === 'number' && fieldsLength < min) {
      batch(() => {
        [...Array(min - fieldsLength)].forEach(() => {
          customPush(defaultValues);
        });
      });
    }
  }, [fieldsLength, customPush, min, defaultValues, batch]);
};

export default useRepeaterFieldsSetup;
