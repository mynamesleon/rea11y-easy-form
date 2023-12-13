import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import type { SelectProps } from './Select.types';
import SelectOptions from './SelectOptions';
import { useFieldClassName } from '../../utils';
import './Select.less';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, ...other }, ref) => {
    const classPrefix = useFieldClassName('select');
    return (
      <select
        data-testid="Select"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix)}
      >
        {options ? <SelectOptions options={options} /> : children}
      </select>
    );
  }
);

const MemoisedSelect = memo(Select);
MemoisedSelect.displayName = 'Select';
export default MemoisedSelect;
