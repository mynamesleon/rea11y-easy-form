import clsx from 'clsx';
import React, { useState, useCallback } from 'react';
import {
  polymorphicForwardRef,
  useFieldClassName,
  isNullOrUndefined,
  useAutoId,
} from '../../utils';
import type { DisclosureProps } from './Disclosure.types';
import './Disclosure.less';

const Disclosure = polymorphicForwardRef<'div', DisclosureProps>(
  (
    {
      as: Component = 'div',
      initialOpen,
      defaultOpen,
      className,
      onChange,
      disabled,
      children,
      summary,
      label,
      title,
      open,
      ...other
    },
    ref
  ) => {
    const id = useAutoId('disclosure');
    const contentId = `${id}__content`;
    const triggerId = `${id}__trigger`;
    const heading = summary || title || label || '';
    const classPrefix = useFieldClassName('disclosure');

    // allow controlled and uncontrolled variant
    const [localOpen, setLocalOpen] = useState<boolean>(
      Boolean(defaultOpen || initialOpen)
    );
    const actualOpen: boolean = isNullOrUndefined(open)
      ? localOpen
      : Boolean(open);

    const handleToggle = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isNullOrUndefined(open)) {
          setLocalOpen((cur: any) => !cur);
        }
        onChange?.(!actualOpen, event);
      },
      [onChange, open, actualOpen]
    );

    return (
      <Component
        data-testid="Disclosure"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix, {
          [`${classPrefix}--open`]: actualOpen,
        })}
      >
        <button
          aria-expanded={actualOpen ? 'true' : 'false'}
          className={`${classPrefix}__trigger`}
          aria-controls={contentId}
          onClick={handleToggle}
          disabled={disabled}
          id={triggerId}
          type="button"
        >
          {typeof heading === 'function' ? heading(actualOpen) : heading}
        </button>
        <div
          className={clsx(`${classPrefix}__content`, {
            [`${classPrefix}__content--open`]: actualOpen,
          })}
          aria-labelledby={triggerId}
          hidden={!actualOpen}
          id={contentId}
        >
          {typeof children === 'function' ? children(actualOpen) : children}
        </div>
      </Component>
    );
  }
);

Disclosure.displayName = 'Disclosure';
export default Disclosure;
