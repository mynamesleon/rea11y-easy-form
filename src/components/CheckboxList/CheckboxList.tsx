import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import { useFieldClassName } from '../../utils';
import SwitchList, { SWITCH_LIST_TYPE } from '../SwitchList';
import type { SwitchListProps } from '../SwitchList/SwitchList.types';

const CheckboxList = forwardRef<
  HTMLFieldSetElement,
  Omit<SwitchListProps, 'type'>
>(({ className, ...other }, ref) => {
  const classPrefix = useFieldClassName('checkbox-list');
  return (
    <SwitchList
      {...other}
      ref={ref}
      type={SWITCH_LIST_TYPE.CHECKBOX}
      className={clsx(className, classPrefix)}
    />
  );
});

// do a deep equal comparison in this case,
// to account for the `options` prop being an inline array
const MemoisedCheckboxList = memo(CheckboxList, isEqual);
MemoisedCheckboxList.displayName = 'CheckboxList';
export default MemoisedCheckboxList;
