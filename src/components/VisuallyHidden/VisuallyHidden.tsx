import clsx from 'clsx';
import React, { memo } from 'react';
import type { VisuallyHiddenProps } from './VisuallyHidden.types';
import polymorphicForwardRef from '../../utils/polymorphicForwardRef';
import useFieldClassName from '../../utils/useFieldClassName';
import './VisuallyHidden.less';

const VisuallyHidden = polymorphicForwardRef<'span', VisuallyHiddenProps>(
  (
    { as: Component = 'span', className, focusable, children, text, ...other },
    ref
  ) => {
    const classPrefix = useFieldClassName('visually-hidden');
    return (
      <Component
        data-testid="VisuallyHidden"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix, {
          [`${classPrefix}--focusable`]: focusable,
        })}
      >
        {children || text}
      </Component>
    );
  }
);

const Memoised = memo(VisuallyHidden);
Memoised.displayName = 'VisuallyHidden';
export default Memoised as typeof VisuallyHidden;
