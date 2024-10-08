import clsx from 'clsx';
import React, { memo } from 'react';
import { polymorphicForwardRef, useFieldClassName } from '../../utils';
import type { LabelProps } from './Label.types';
import './Label.less';

const Label = polymorphicForwardRef<'label', LabelProps>(
  (
    {
      text,
      htmlFor,
      required,
      children,
      className,
      srRequiredText,
      as: Component = 'label',
      ...other
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('label');
    // prevent orphaned label elements being rendered
    if (Component === 'label' && !children && !text) {
      return null;
    }
    const AsteriskComponent = srRequiredText ? 'abbr' : 'span';
    return (
      <Component
        data-testid="Label"
        {...other}
        ref={ref}
        htmlFor={Component === 'label' ? htmlFor : undefined}
        className={clsx(className, classPrefix, {
          [`${classPrefix}--required`]: required,
        })}
      >
        {Boolean(required) && (
          <AsteriskComponent
            className={`${classPrefix}__asterisk`}
            aria-label={srRequiredText}
            title={srRequiredText}
          >
            *
          </AsteriskComponent>
        )}
        {children || text}
      </Component>
    );
  }
);

const Memoised = memo(Label);
Memoised.displayName = 'Label';
export default Memoised as typeof Label;
