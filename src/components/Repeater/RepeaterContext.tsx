import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useFieldArray } from 'react-final-form-arrays';
import { useDeepCompareMemo } from '@react-hookz/web';
import { useForm } from 'react-final-form';
import { useEasyFormContext } from '../EasyForm';
import {
  REPEATER_STRINGS_KEYS,
  RepeaterContextProps,
  RepeaterContextValue,
  RepeaterContextStrings,
  RepeaterContextStringsFns,
} from './RepeaterContext.types';
import { useAnnounce } from '../../utils';

const repeaterContextStringHandler = (prop: any, args: any[] = []): string => {
  const possible = typeof prop === 'function' ? prop(...args) : prop;
  return typeof possible === 'string' ? possible : '';
};

const generateContextStringsFns = (props?: RepeaterContextStrings) =>
  REPEATER_STRINGS_KEYS.reduce((result, key) => {
    result[key] = (...args: any[]) =>
      repeaterContextStringHandler(props?.[key], args);
    return result;
  }, {}) as RepeaterContextStringsFns;

const DEFAULT_VALUES = {};
const REPEATER_CONTEXT = createContext<RepeaterContextValue>({
  ...generateContextStringsFns(),
  defaultValues: DEFAULT_VALUES,
  srAnnounce: () => {},
  dragAndDrop: true,
  disabled: false,
  ordering: true,
  max: Infinity,
  fields: {},
  min: 0,
});

export const useRepeaterContext = (): RepeaterContextValue =>
  useContext(REPEATER_CONTEXT);

const RepeaterContext = ({
  defaultValues = DEFAULT_VALUES,
  dragAndDrop = true,
  disabled = false,
  ordering = true,
  children,
  name,
  min,
  max,
  ...strings
}: RepeaterContextProps) => {
  const { batch } = useForm();
  const { fields } = useFieldArray(name, {
    subscription: { value: true, error: true, touched: true },
  });
  const { announcer, announce } = useAnnounce();

  useEffect(() => {
    // populate to minimum number of repeater entries
    const fieldsLength = fields.length || 0;
    if (typeof min === 'number' && fieldsLength < min) {
      batch(() => {
        [...Array(min - fieldsLength)].forEach(() => {
          fields.push(defaultValues);
        });
      });
    }
  }, [fields, min, defaultValues, batch]);

  // if useEasyFormContext is used within Repeater directly,
  // it causes an infinite rendering loop (sometimes...)
  const { disabled: formDisabled } = useEasyFormContext() || {};
  const stringFns = useDeepCompareMemo(
    () => generateContextStringsFns(strings),
    [strings]
  );
  const contextValue = useMemo(
    () => ({
      min: typeof min === 'number' && min > -1 ? min : 0,
      max: typeof max === 'number' ? max : Infinity,
      disabled: Boolean(disabled || formDisabled),
      dragAndDrop: Boolean(dragAndDrop),
      ordering: Boolean(ordering),
      srAnnounce: announce,
      defaultValues,
      fields,
      ...stringFns,
    }),
    [
      defaultValues,
      formDisabled,
      dragAndDrop,
      stringFns,
      announce,
      disabled,
      ordering,
      fields,
      min,
      max,
    ]
  );

  return (
    <REPEATER_CONTEXT.Provider value={contextValue}>
      {announcer}
      {children}
    </REPEATER_CONTEXT.Provider>
  );
};

export default RepeaterContext;
