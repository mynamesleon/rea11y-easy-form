import type { ComponentProps, ReactNode } from 'react';
import type { EasyFieldFieldProps } from '../EasyFieldField';
import Label from '../../Label';

export type EasyFieldGroupProps = {
  /**
   * Description to be associated with the rendered field element
   */
  description?: ReactNode;
  /**
   * Alias for `description`
   */
  helpText?: ReactNode;
  /**
   * Indicate if the form element is a required field;
   * used for the label
   */
  required?: boolean;
  /**
   * All form elements should have a label...
   */
  label?: ReactNode;
  /**
   * Used in a className on the containing div
   */
  type?: string;
  /**
   * Component to pass to the `<Label>` (if a non-react element is used for the `label` prop)
   */
  labelAs?: ComponentProps<typeof Label>['as'];
  id?: string;
} & EasyFieldFieldProps;
