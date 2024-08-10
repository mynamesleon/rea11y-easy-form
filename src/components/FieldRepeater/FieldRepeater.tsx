import React from 'react';
import { isValidElementType } from 'react-is';
import Fieldset from '../Fieldset';
import EasyField from '../EasyField';
import FieldRepeaterContent from './FieldRepeaterContent';
import FieldRepeaterContext from './FieldRepeaterContext';
import type { FieldRepeaterProps } from './FieldRepeater.types';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';
import { useFieldArray } from '../../utils';
import './FieldRepeater.less';

const FieldRepeater = ({
  defaultValues,
  dragAndDrop,
  className,
  disabled,
  ordering,
  children,
  strings,
  legend,
  label,
  name,
  min,
  max,
  ...other
}: FieldRepeaterProps) => {
  // silently handle children not being a function
  if (typeof children !== 'function' || typeof name !== 'string' || !name) {
    return null;
  }

  const legendToUse = legend || label;
  return (
    <FieldRepeaterContext
      defaultValues={defaultValues}
      dragAndDrop={dragAndDrop}
      disabled={disabled}
      ordering={ordering}
      strings={strings}
      min={min}
      max={max}
    >
      <EasyField
        as={isValidElementType(legendToUse) ? Fieldset : 'div'}
        useFieldHook={useFieldArray}
        label={legendToUse}
        labelAs="legend"
        name={name}
        {...other}
      >
        {(fields: FieldArrayInput<any>) => (
          <FieldRepeaterContent
            className={className}
            children={children}
            fields={fields}
          />
        )}
      </EasyField>
    </FieldRepeaterContext>
  );
};

export default FieldRepeater;
