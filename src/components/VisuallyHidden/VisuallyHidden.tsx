import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { VisuallyHiddenProps } from './VisuallyHidden.types';
import useFieldClassName from '../../utils/useFieldClassName';
import './VisuallyHidden.less';

const VisuallyHidden = forwardRef<any, VisuallyHiddenProps>(
  (
    {
      component: Component = 'span',
      className,
      focusable,
      children,
      text,
      ...props
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('visually-hidden');
    return (
      <Component
        data-testid="VisuallyHidden"
        {...props}
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
export default Memoised;
