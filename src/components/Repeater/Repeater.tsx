import React from 'react';
import { isValidElementType } from 'react-is';
import Fieldset from '../Fieldset';
import EasyField from '../EasyField';
import RepeaterContent from './RepeaterContent';
import RepeaterContext from './RepeaterContext';
import type { RepeaterProps } from './Repeater.types';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';
import { useFieldArray } from '../../utils';
import './Repeater.less';

const Repeater = ({
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
}: RepeaterProps) => {
  // silently handle children not being a function
  if (typeof children !== 'function' || typeof name !== 'string' || !name) {
    return null;
  }

  const legendToUse = legend || label;
  return (
    <RepeaterContext
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
          <RepeaterContent
            className={className}
            children={children}
            fields={fields}
          />
        )}
      </EasyField>
    </RepeaterContext>
  );
};

export default Repeater;
