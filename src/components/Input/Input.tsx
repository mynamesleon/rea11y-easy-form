import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { useFieldClassName } from '../../utils';
import { InputProps } from './Input.types';
import './Input.less';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className, ...other }, ref) => {
    const classPrefix = useFieldClassName('input');
    return (
      <input
        data-testid="Input"
        {...other}
        className={clsx(
          className,
          classPrefix,
          Boolean(type) && `${classPrefix}--${type}`
        )}
        type={type}
        ref={ref}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
