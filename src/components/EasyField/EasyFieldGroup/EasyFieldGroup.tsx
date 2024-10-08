import clsx from 'clsx';
import React, { useMemo } from 'react';
import { isElement as isReactElement } from 'react-is';
import {
  useAutoId,
  useFieldClassName,
  polymorphicForwardRef,
} from '../../../utils';
import type { EasyFieldGroupProps } from './EasyFieldGroup.types';
import EasyFieldField from '../EasyFieldField';
import Label from '../../Label';
import './EasyFieldGroup.less';

const EasyFieldGroup = polymorphicForwardRef<'div', EasyFieldGroupProps>(
  (
    {
      'aria-describedby': describedBy,
      as: Component = 'div',
      description: desc,
      id: idProp,
      className,
      helpText,
      required,
      labelAs,
      label,
      type,
      name,
      ...other
    },
    ref
  ) => {
    const autoId = useAutoId(name || 'easy-field-group');
    const id = idProp || autoId;
    const descriptionId = useAutoId(`${id ? `${id}-` : ''}__description`);
    const description = desc || helpText;
    const hasDescription = Boolean(description);
    const classPrefix = useFieldClassName('easy-field-group');
    // use clsx to handle the string merging
    const ariaDescribedBy = clsx(
      describedBy,
      hasDescription && descriptionId
    ).trim();

    const fieldProps = useMemo(() => {
      const result = {
        id,
        name,
        type,
        className: `${classPrefix}__field`,
      };
      if (ariaDescribedBy) {
        result['aria-describedby'] = ariaDescribedBy;
      }
      return result;
    }, [id, name, type, classPrefix, ariaDescribedBy]);

    return (
      <Component
        data-testid="EasyFieldGroup"
        className={clsx(
          className,
          classPrefix,
          Boolean(type) && `${classPrefix}--${type}`
        )}
        ref={ref}
      >
        {/* allow for the label to be another element if needed */}
        {Boolean(label) &&
          (isReactElement(label) ? (
            label
          ) : (
            <Label
              className={`${classPrefix}__label`}
              required={required}
              as={labelAs}
              htmlFor={id}
              text={label}
            />
          ))}

        {hasDescription && (
          <div id={descriptionId} className={`${classPrefix}__description`}>
            {description}
          </div>
        )}

        <EasyFieldField
          {...other}
          {...fieldProps}
          aria-required={Boolean(required)}
        />
      </Component>
    );
  }
);

EasyFieldGroup.displayName = 'EasyFieldGroup';
export default EasyFieldGroup;
