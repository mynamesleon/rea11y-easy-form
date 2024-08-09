import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useDeepCompareEffect } from '@react-hookz/web';
import { useEasyFormContext } from '../EasyForm';
import {
  FIELD_REPEATER_STRINGS_KEYS,
  type FieldRepeaterContextProps,
  type FieldRepeaterContextValue,
  type FieldRepeaterContextStrings,
  type FieldRepeaterContextStringsFns,
} from './FieldRepeaterContext.types';
import { useAnnounce } from '../../utils';

const DEFAULT_STRINGS = {
  add: 'Add another entry',
  delete: 'Remove this entry',
  moveDown: 'Move down',
  moveUp: 'Move up',
  reorder: 'Re-order',
  srItemDropped: 'You have dropped the item.',
  srItemDroppedInvalid: 'The item has been dropped while not over a drop area.',
  srCannotBeDropped: 'You are over an area that cannot be dropped on.',
  srMovementCancelled: 'Movement cancelled.',
  srUsageInstructions:
    'Press space bar to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Some screen readers may require you to be in focus mode or to use your pass through key.',
  srItemAdded: (position: string | number) =>
    `Item added at position ${position}`,
  srItemDeleted: (position: string | number) =>
    `Item at position ${position} deleted`,
  srItemLifted: (position: string | number) =>
    `You have lifted an item in position ${position}.`,
  srItemMoved: (start: string | number, end: string | number) =>
    `You have moved the item from position ${start} to position ${end}.`,
  srReturnedToStart: (position: string | number) =>
    `The item has returned to its starting position of ${position}.`,
};

const repeaterContextStringHandler = (prop: any, args: any[] = []): string => {
  const possible = typeof prop === 'function' ? prop(...args) : prop;
  return typeof possible === 'string' ? possible : '';
};

const generateContextStringsFns = (
  stringsProp?: FieldRepeaterContextStrings
) => {
  const strings = { ...DEFAULT_STRINGS, ...(stringsProp || {}) };
  return FIELD_REPEATER_STRINGS_KEYS.reduce((result, key) => {
    result[key] = (...args: any[]) =>
      repeaterContextStringHandler(strings?.[key], args);
    return result;
  }, {}) as FieldRepeaterContextStringsFns;
};

const DEFAULT_VALUES = {};
const FIELD_REPEATER_CONTEXT = createContext<FieldRepeaterContextValue>({
  strings: generateContextStringsFns(),
  defaultValues: DEFAULT_VALUES,
  srAnnounce: () => {},
  dragAndDrop: true,
  disabled: false,
  ordering: true,
  max: Infinity,
  min: 0,
});

export const useFieldRepeaterContext = (): FieldRepeaterContextValue =>
  useContext(FIELD_REPEATER_CONTEXT);

const FieldRepeaterContext = ({
  defaultValues = DEFAULT_VALUES,
  dragAndDrop = true,
  disabled = false,
  ordering = true,
  children,
  strings,
  min,
  max,
}: FieldRepeaterContextProps) => {
  const { announcer, announce } = useAnnounce();

  // if useEasyFormContext is used within FieldRepeater directly,
  // it causes an infinite rendering loop (sometimes...)
  // so we will use it within this context provider instead
  const { disabled: formDisabled } = useEasyFormContext() || {};

  // using a ref to handle inline/anonymous functions being provided for strings
  const stringsRef = useRef<FieldRepeaterContextStringsFns>(
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
    ]
  );

  return (
    <FIELD_REPEATER_CONTEXT.Provider value={contextValue}>
      {announcer}
      {children}
    </FIELD_REPEATER_CONTEXT.Provider>
  );
};

export default FieldRepeaterContext;
