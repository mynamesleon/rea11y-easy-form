import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface FieldsetProps extends ComponentPropsWithRef<'fieldset'> {
  /**
   * Alias for `legend`
   */
  label?: ReactNode;
  /**
   * The legend contents
   */
  legend?: ReactNode;
  /**
   * Alias for `visuallyHiddenLegend`
   */
  srOnlyLegend?: boolean;
  visuallyHiddenLegend?: boolean;
}
