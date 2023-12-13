import React, { memo } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import { reactKeyFrom } from '../../utils';
import type {
  SelectOptionsProps,
  DetailedSelectOption,
  SelectOption,
} from './Select.types';

const getOptionDetails = (option: SelectOption) => {
  const isString = typeof option === 'string';
  const detailedOption = option as DetailedSelectOption;
  const { value, label, key, disabled, children, selected } = detailedOption;
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

  return {
    key,
    children,
    value: optionValue,
    label: optionLabel,
    disabled: Boolean(disabled),
    selected: Boolean(selected) || undefined,
  };
};

const SelectOptions = ({ options }: SelectOptionsProps) => {
  if (!Array.isArray(options) || !options.length) {
    return null;
  }

  return (
    <>
      {options.map((option = {}, index) => {
        const { key, children, value, label, disabled, selected } =
          getOptionDetails(option);

        if (Array.isArray(children)) {
          return (
            <optgroup
              // not using the `value` returned from `getOptionDetails`,
              // as that also uses the `label` if necessary,
              // and optGroup labels may not be unique;
              // use index as last resort
              key={reactKeyFrom(
                key,
                (option as DetailedSelectOption)?.value,
                index
              )}
              disabled={disabled}
              label={label}
            >
              <SelectOptions options={children} />
            </optgroup>
          );
        }

        return (
          <option
            // safe(r) to use `value` from getOptionDetails here,
            // as even if the label is used as the value
            // (due to no `value` property, or option being a string),
            // the value should be unique;
            // use index as last resort
            key={reactKeyFrom(key, value, index)}
            disabled={disabled}
            value={value}
            // selected should really be controlled by the parent <select>
            // but we will support it just in case
            selected={selected}
          >
            {label}
          </option>
        );
      })}
    </>
  );
};

const MemoisedSelectOptions = memo(SelectOptions, isEqual);
MemoisedSelectOptions.displayName = 'SelectOptions';
export default MemoisedSelectOptions;
