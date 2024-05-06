import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';
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
      legendClassName,
      visuallyHiddenLegend,
      ...other
    },
    ref
  ) => {
    const legendText = legend || label;
    const classPrefix = useFieldClassName('fieldset');
    const legendClass = clsx(legendClassName, `${classPrefix}__legend`);
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
              className={legendClass}
              component="legend"
              text={legendText}
            />
          ) : (
            <legend className={legendClass}>{legendText}</legend>
          ))}
        {children}
      </fieldset>
    );
  }
);

const MemoisedFieldset = memo(Fieldset);
MemoisedFieldset.displayName = 'Fieldset';
export default MemoisedFieldset;
