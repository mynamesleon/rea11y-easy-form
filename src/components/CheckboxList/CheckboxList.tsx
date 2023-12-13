import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import { useFieldClassName } from '../../utils';
import SwitchList, { SWITCH_LIST_TYPE } from '../SwitchList';
import { CheckboxListProps } from './CheckboxList.types';

const CheckboxList = forwardRef<HTMLFieldSetElement, CheckboxListProps>(
  ({ className, ...other }, ref) => {
    const classPrefix = useFieldClassName('checkbox-list');
    return (
      <SwitchList
        {...other}
        ref={ref}
        type={SWITCH_LIST_TYPE.CHECKBOX}
        className={clsx(className, classPrefix)}
      />
    );
  }
);

// do a deep equal comparison in this case,
// to account for lazy use of the `options` prop
// @todo: confirm if there is any performance benefit by memoising here,
// as the base SwitchList already does a deepEqual props comparison
const MemoisedCheckboxList = memo(CheckboxList, isEqual);
MemoisedCheckboxList.displayName = 'CheckboxList';
export default MemoisedCheckboxList;
