import { useCallback, useEffect, useRef } from 'react';
import {
  FIELD_REPEATER_ENTRY_KEY,
  isNullOrUndefined,
  useAutoId,
} from '../../utils';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';
import { useFieldRepeaterContext } from './FieldRepeaterContext';
import { useForm } from 'react-final-form';

const isPlainObject = (value: any) =>
  typeof value === 'object' &&
  !Array.isArray(value) &&
  !isNullOrUndefined(value);

const useFieldRepeaterFieldsSetup = ({
  length: fieldsLength,
  update: fieldsUpdate,
  value: fieldsValue,
  push: fieldsPush,
}: FieldArrayInput<any>) => {
  const idIndex = useRef<number>(0);
  const { batch } = useForm('FieldRepeater');
  const idPrefix = useAutoId('repeater');

  const customPush = useCallback(
    (value: any) => {
      const index = (idIndex.current += 1);
      const valueToUse = isPlainObject(value)
        ? { ...value, [FIELD_REPEATER_ENTRY_KEY]: `${idPrefix}_${index}` }
        : value;
      fieldsPush(valueToUse);
    },
    [idPrefix, fieldsPush]
  );

  // update initial repeater entries to have a custom key
  useEffect(() => {
    batch(() => {
      fieldsValue.forEach((value, index) => {
        if (isPlainObject(value) && !value[FIELD_REPEATER_ENTRY_KEY]) {
          const key = `${idPrefix}_${(idIndex.current += 1)}`;
          fieldsUpdate(index, {
            ...value,
            [FIELD_REPEATER_ENTRY_KEY]: key,
          });
        }
      });
    });
  }, [fieldsValue, fieldsUpdate, batch, idPrefix]);

  // populate to minimum number of repeater entries
  const { min, defaultValues } = useFieldRepeaterContext();
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

export default useFieldRepeaterFieldsSetup;
