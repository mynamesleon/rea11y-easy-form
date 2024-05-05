import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  type FieldArrayRenderProps,
  useFieldArray,
} from 'react-final-form-arrays';
import { useDeepCompareEffect } from '@react-hookz/web';
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
  strings: generateContextStringsFns(),
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
  subscription = {},
  disabled = false,
  ordering = true,
  children,
  name,
  min,
  max,
  ...strings
}: RepeaterContextProps) => {
  const { batch } = useForm('Repeater');
  const { fields } = useFieldArray(name, {
    subscription: { ...subscription, value: true, error: true, touched: true },
  });
  // the `fields` object from `useFieldArray` is not memoised,
  // and neither are the functions it returns, so we will use a ref
  // to prevent unnecessary re-renders, and add `fields.value`
  // to the context value's dependency array
  const fieldsRef = useRef<FieldArrayRenderProps<any, HTMLElement>['fields']>();
  fieldsRef.current = fields;
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

  // using a ref to handle inline/anonymous functions being provided for strings
  const stringsRef = useRef<RepeaterContextStringsFns>(
    generateContextStringsFns(strings)
  );
  useDeepCompareEffect(() => {
    const newSrStringsFns = generateContextStringsFns(strings);
    for (const key in newSrStringsFns) {
      if (newSrStringsFns.hasOwnProperty(key)) {
        stringsRef.current[key] = newSrStringsFns[key];
      }
    }
  }, [strings]);

  const contextValue = useMemo(
    () => ({
      min: typeof min === 'number' && min > -1 ? min : 0,
      max: typeof max === 'number' ? max : Infinity,
      disabled: Boolean(disabled || formDisabled),
      dragAndDrop: Boolean(dragAndDrop),
      strings: stringsRef.current,
      ordering: Boolean(ordering),
      fields: fieldsRef.current,
      srAnnounce: announce,
      defaultValues,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      defaultValues,
      formDisabled,
      dragAndDrop,
      announce,
      disabled,
      ordering,
      min,
      max,
      // need for updates due to using `fieldsRef`
      fields.value,
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
