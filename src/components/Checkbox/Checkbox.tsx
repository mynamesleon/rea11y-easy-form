import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { useFieldClassName } from '../../utils';
import Switch, { SWITCH_TYPE } from '../Switch';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...other }, ref) => {
    const classPrefix = useFieldClassName('checkbox');
    return (
      <Switch
        {...other}
        ref={ref}
        type={SWITCH_TYPE.CHECKBOX}
        className={clsx(className, classPrefix)}
      />
    );
  }
);

const MemoisedCheckbox = memo(Checkbox);
MemoisedCheckbox.displayName = 'Checkbox';
export default MemoisedCheckbox;
