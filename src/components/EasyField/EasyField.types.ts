import type {
  UseFieldConfig,
  RenderableProps,
  FieldMetaState,
  FieldInputProps,
} from 'react-final-form';
import type { FieldSubscription, FieldValidator } from 'final-form';
import type { Dictionary } from '../../utils/constants';
import { ElementType, ReactNode } from 'react';

export interface EasyFieldRenderProps
  extends FieldInputProps<any, any>,
    Dictionary {
  /**
   * the `meta` object returned by `useField()`
   * - only included if `meta` is set to `true` on `EasyFieldProps`
   */
  meta?: FieldMetaState<any>;
  /**
   * className to pass on to the rendered form field
   */
  className?: string;
  /**
   * aria attribute to pass on to the rendered form field
   */
  'aria-describedby'?: string;
  /**
   * aria attribute to pass on to the rendered form field
   */
  'aria-invalid'?: boolean;
  /**
   * aria attribute to pass on to the rendered form field
   */
  'aria-required'?: boolean;
}

type EasyFieldValidationRule = boolean | string | FieldValidator<any> | any;

export interface EasyFieldProps
  extends UseFieldConfig<any, any>,
    RenderableProps<EasyFieldRenderProps>,
    Dictionary {
  name?: string;
  /**
   * whether to pass the `useField()` `meta` object to the rendered field component
   */
  meta?: boolean;
  /**
   * aria attribute to pass on to the rendered form field
   */
  'aria-describedby'?: string;
  /**
   * Advanced Usage:
   * when `meta.error` has a value, this object is used to
   * detail which parts of the `meta` object from `FieldRenderProps`
   * should determine displaying the error message or not
   * @example { touched: true, pristine: false }
   * would cause the error to show only when meta.touched is truthy,
   * and meta.pristine is falsy
   */
  errorLogic?: FieldSubscription;
  /**
   * Advanced Usage:
   * for completely custom field level validation, the `validate` prop
   * (from react-final-form's FieldProps) is still the best solution.
   * Alternatively, you can use this validation object
   */
  validation?: Dictionary<EasyFieldValidationRule>;
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
  required?: EasyFieldValidationRule;
  /**
   * All form elements should have a label...
   */
  label?: ReactNode;
  /**
   * Component to pass to the `<Label>`
   * (e.g. to render a `<div>` instead of a `<label>` for a text-content field)
   */
  labelComponent?: ElementType;
}
