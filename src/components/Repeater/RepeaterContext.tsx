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
  // @todo: allow repeater subscription to be controlled too?
  // we aren't currently passing any of the data to the `children` function,
  // but it might be useful if consuming apps need more re-renders (for some reason)
  const { fields } = useFieldArray(name, {
    subscription: { value: true, error: true, touched: true },
  });
  const { announcer, announce } = useAnnounce();

  // populate to minimum number of repeater entries
  useEffect(() => {
    const fieldsLength = fields.length || 0;
    if (typeof min === 'number' && fieldsLength < min) {
      batch(() => {
        [...Array(min - fieldsLength)].forEach(() => {
          fields.push(defaultValues);
        });
      });
    }
  }, [fields, fields.length, min, defaultValues, batch]);

  // if useEasyFormContext is used within Repeater directly,
  // it causes an infinite rendering loop (sometimes...)
  // so we will use it within this context provider instead
  const { disabled: formDisabled } = useEasyFormContext() || {};

  // @todo: improve this for inline/anonymous functions being provided?
  // this component relies on a lot of re-renders anyway, so could do
  // with a general performance overhaul with less stored in context
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
