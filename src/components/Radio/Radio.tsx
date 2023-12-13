import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { useFieldClassName } from '../../utils';
import Switch, { SWITCH_TYPE } from '../Switch';
import { RadioProps } from './Radio.types';

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...other }, ref) => {
    const classPrefix = useFieldClassName('checkbox');
    return (
      <Switch
        {...other}
        ref={ref}
        type={SWITCH_TYPE.RADIO}
        className={clsx(className, classPrefix)}
      />
    );
  }
);

const MemoisedRadio = memo(Radio);
MemoisedRadio.displayName = 'Radio';
export default MemoisedRadio;
