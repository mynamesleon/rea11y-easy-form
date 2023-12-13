import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import Fieldset from '../Fieldset';
import { useAutoId, useFieldClassName } from '../../utils';
import useSwitchListOptions from './useSwitchListOptions';
import { SwitchListProps, SWITCH_LIST_TYPE } from './SwitchList.types';
import './SwitchList.less';

const SwitchList = forwardRef<HTMLFieldSetElement, SwitchListProps>(
  (
    {
      options,
      name,
      className,
      type = SWITCH_LIST_TYPE.SWITCH,
      disabled,
      // desctructuring these so that they do not get added to the wrapping Fieldset
      onBlur,
      onFocus,
      onChange,
      ...other
    },
    ref
  ) => {
    const id = useAutoId('switch-list');
    const classPrefix = useFieldClassName('switch-list');
    const items = useSwitchListOptions({
      id,
      classPrefix,
      options,
      type,
      name,
      disabled,
    });

    if (!items) {
      return null;
    }

    return (
      <Fieldset
        data-testid="SwitchList"
        visuallyHiddenLegend
        {...other}
        ref={ref}
        className={clsx(className, classPrefix)}
      >
        <ul className={`${classPrefix}__list`}>{items}</ul>
      </Fieldset>
    );
  }
);

// do a deep equal comparison in this case,
// to account for lazy use of the `options` prop
const MemoisedSwitchList = memo(SwitchList, isEqual);
MemoisedSwitchList.displayName = 'SwitchList';
export default MemoisedSwitchList;
