import React, { useMemo, ReactNode } from 'react';
import clsx from 'clsx';
import { Field } from 'react-final-form';
import {
  DetailedSwitchListOption,
  SwitchListOptions,
  SWITCH_LIST_TYPE,
  useSwitchListOptionsArg,
} from './SwitchList.types';
import Label from '../Label';
import Switch, { SWITCH_TYPE } from '../Switch';
import { reactKeyFrom, useAutoId } from '../../utils';

const getOptionDetails = (option: string | DetailedSwitchListOption = {}) => {
  const isString = typeof option === 'string';
  const detailedOption = option as DetailedSwitchListOption;
  const { value, label, key, disabled, className } = detailedOption;
  // if option is a string, use that as label
  // if object, prioritise label, but use value if necessary
  const optionLabel = isString
    ? option
    : typeof label === 'string'
    ? label
    : value;
  // if option is a string, use that as value
  // if object, prioritise value, but use label if necessary
  const optionValue = isString
    ? option
    : typeof value === 'string'
    ? value
    : label;

  return { label: optionLabel, value: optionValue, key, disabled, className };
};

const processSwitchListOptions = (
  options: SwitchListOptions = [],
  name: string,
  type: SWITCH_LIST_TYPE,
  id?: string,
  disabled?: boolean,
  classPrefix?: string
): ReactNode[] | null => {
  if (!Array.isArray(options) || !options.length) {
    return null;
  }

  return options.map((option = {}, index) => {
    const {
      value,
      label,
      key,
      disabled: optionDisabled,
      className,
    } = getOptionDetails(option);
    const inputId = `${id}__${index + 1}`;
    // process the 'switch' type as checkboxes, to leverage final-form's default handling
    const fieldType =
      type === SWITCH_LIST_TYPE.SWITCH ? SWITCH_LIST_TYPE.CHECKBOX : type;
    return (
      <li
        // use the inputId (which relies on index) for key as a last resort
        key={reactKeyFrom(key, value, inputId)}
        className={`${classPrefix}__list-item`}
      >
        <Field
          {...{ type: fieldType as unknown as string, name, value }}
          subscription={{ value: true }}
        >
          {({ input }) => (
            <Switch
              {...input}
              disabled={Boolean(optionDisabled || disabled)}
              id={inputId}
              type={type as unknown as SWITCH_TYPE}
              className={clsx(className, `${classPrefix}__input`)}
            />
          )}
        </Field>
        <Label htmlFor={inputId}>{label}</Label>
      </li>
    );
  });
};

const useSwitchListOptions = ({
  type: switchType,
  id: initialId,
  classPrefix,
  disabled,
  options,
  name,
}: useSwitchListOptionsArg): ReactNode[] | null => {
  const typedSwitchType = switchType as SWITCH_LIST_TYPE;
  const type = useMemo<SWITCH_LIST_TYPE>(
    () =>
      Object.values(SWITCH_LIST_TYPE).includes(typedSwitchType)
        ? typedSwitchType
        : SWITCH_LIST_TYPE.SWITCH,
    [typedSwitchType]
  );
  const id = useAutoId(`${initialId || name}__${type}__input`);
  const nodes = useMemo(
    () =>
      processSwitchListOptions(options, name, type, id, disabled, classPrefix),
    [options, id, type, disabled, name, classPrefix]
  );
  return nodes;
};

export default useSwitchListOptions;
