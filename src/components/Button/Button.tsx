import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';
import type { ButtonProps } from './Button.types';
import { useFieldClassName } from '../../utils';
import './Button.less';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      component: Component = 'button',
      type = 'button',
      className,
      children,
      variant,
      text,
      ...other
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('button');
    return (
      <Component
        className={clsx(
          className,
          classPrefix,
          typeof variant === 'string' &&
            `${classPrefix}--${variant.toLowerCase()}`
        )}
        data-testid="Button"
        type={type}
        {...other}
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
export default MemoisedButton;
