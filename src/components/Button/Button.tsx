import clsx from 'clsx';
import React, { memo } from 'react';
import type { ButtonProps } from './Button.types';
import { polymorphicForwardRef, useFieldClassName } from '../../utils';
import './Button.less';

const Button = polymorphicForwardRef<'button', ButtonProps>(
  (
    {
      as: Component = 'button',
      className,
      disabled,
      children,
      variant,
      text,
      ...other
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('button');
    const type =
      'type' in other && other.type === undefined
        ? undefined
        : other.type || 'button';
    return (
      <Component
        className={clsx(
          className,
          classPrefix,
          Boolean(disabled) && `${classPrefix}--disabled`,
          typeof variant === 'string' &&
            `${classPrefix}--${variant.toLowerCase()}`
        )}
        data-testid="Button"
        disabled={disabled}
        {...other}
        type={type}
        ref={ref}
      >
        <span className={`${classPrefix}__shade`} />
        <span className={`${classPrefix}__content`}>
          {text}
          {children}
        </span>
      </Component>
    );
  }
);

const MemoisedButton = memo(Button);
MemoisedButton.displayName = 'Button';
export default MemoisedButton as typeof Button;
