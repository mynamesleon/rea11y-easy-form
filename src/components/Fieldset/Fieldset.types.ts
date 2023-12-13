import type { FieldsetHTMLAttributes, ReactNode } from 'react';

export interface FieldsetProps extends FieldsetPropsBase {
  children?: ReactNode;
}

export interface FieldsetPropsBase
  extends FieldsetPropsStandAlone,
    FieldsetHTMLAttributes<HTMLFieldSetElement> {}

export interface FieldsetPropsStandAlone {
  /**
   * Alias for `legend`
   */
  label?: ReactNode;
  /**
   * The legend contents
   */
  legend?: ReactNode;
  className?: string;
  /**
   * Alias for `visuallyHiddenLegend`
   */
  srOnlyLegend?: boolean;
  visuallyHiddenLegend?: boolean;
}
