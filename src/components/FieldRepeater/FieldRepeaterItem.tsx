import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { useFieldRepeaterContext } from './FieldRepeaterContext';
import { useAutoId, useFieldClassName } from '../../utils';
import type { FieldRepeaterItemProps } from './FieldRepeaterItem.types';
import Button from '../Button';

const FieldRepeaterItem = forwardRef<HTMLDivElement, FieldRepeaterItemProps>(
  (
    {
      dragHandleProps,
      isDragging,
      className,
      children,
      moveDown,
      moveUp,
      remove,
      fields,
      index,
      ...other
    },
    ref
  ) => {
    const { min, strings, disabled, ordering, dragAndDrop } =
      useFieldRepeaterContext();
    const repeaterItemId = useAutoId('field-repeater-item');
    const classPrefix = useFieldClassName('field-repeater');
    const buttonClass = `${classPrefix}__button`;

    const sharedButtonProps = {
      'aria-controls': repeaterItemId,
      type: 'button' as const,
      disabled,
    };

    return (
      <div
        {...other}
        className={clsx(
          className,
          `${classPrefix}__item`,
          isDragging && `${classPrefix}__item--dragging`
        )}
        id={repeaterItemId}
        ref={ref}
      >
        {children}
        <div className={`${classPrefix}__item-actions`}>
          {typeof remove === 'function' && (
            <Button
              className={`${buttonClass} ${buttonClass}--delete`}
              {...sharedButtonProps}
              disabled={Boolean(disabled || (min && fields.length <= min))}
              text={strings.delete(index)}
              variant="destructive"
              onClick={remove}
            />
          )}
          {Boolean(ordering) && (
            <>
              {typeof moveDown === 'function' && (
                <Button
                  className={`${buttonClass} ${buttonClass}--move-down`}
                  text={strings.moveDown(index)}
                  {...sharedButtonProps}
                  onClick={moveDown}
                />
              )}
              {typeof moveUp === 'function' && (
                <Button
                  className={`${buttonClass} ${buttonClass}--move-up`}
                  text={strings.moveUp(index)}
                  {...sharedButtonProps}
                  onClick={moveUp}
                />
              )}
            </>
          )}
          {/* keeping the re-order button even when disabled */}
          {fields.length > 1 &&
            Boolean(dragAndDrop) &&
            (Boolean(dragHandleProps) || disabled) && (
              <Button
                className={`${buttonClass} ${buttonClass}--drag`}
                text={strings.reorder(index)}
                {...sharedButtonProps}
                {...dragHandleProps}
                type={undefined}
                as="span"
              />
            )}
        </div>
      </div>
    );
  }
);

export default FieldRepeaterItem;
