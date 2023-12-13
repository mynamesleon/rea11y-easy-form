import clsx from 'clsx';
import React, { forwardRef } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import { FieldsetProps } from './Fieldset.types';
import { useFieldClassName } from '../../utils';
import './Fieldset.less';

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      label,
      legend,
      children,
      className,
      srOnlyLegend,
      visuallyHiddenLegend,
      ...other
    },
    ref
  ) => {
    const legendText = legend || label;
    const classPrefix = useFieldClassName('fieldset');
    const legendClassName = `${classPrefix}__legend`;
    return (
      <fieldset
        data-testid="Fieldset"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix)}
      >
        {Boolean(legendText) &&
          (Boolean(srOnlyLegend || visuallyHiddenLegend) ? (
            <VisuallyHidden
              component="legend"
              className={legendClassName}
              text={legendText}
            />
          ) : (
            <legend className={legendClassName}>{legendText}</legend>
          ))}
        {children}
      </fieldset>
    );
  }
);

Fieldset.displayName = 'Fieldset';
export default Fieldset;
