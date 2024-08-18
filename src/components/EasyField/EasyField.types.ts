import type { FieldValidator } from 'final-form';
import type {
  FieldMetaState,
  FieldInputProps,
  RenderableProps,
} from 'react-final-form';
import type { EasyFieldGroupProps } from './EasyFieldGroup/EasyFieldGroup.types';
import type { Dictionary, Merge } from '../../utils';

export interface EasyFieldRenderProps
  extends FieldInputProps<any, any>,
    Dictionary<any> {
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

export type EasyFieldValidationRule =
  | boolean
  | string
  | FieldValidator<any>
  | any;

export type EasyFieldProps = {
  /**
   * whether to pass the `useField()` `meta` object to the rendered field component
   */
  meta?: boolean;
  /**
   * Advanced Usage:
   * for completely custom field level validation, the `validate` prop
   * (from react-final-form's FieldProps) is still the best solution.
   * Alternatively, you can use this validation object
   */
  validation?: Dictionary<EasyFieldValidationRule>;
  /**
   * Indicate if the form element is a required field;
   * used for the label
   */
  required?: EasyFieldValidationRule;
} & Merge<EasyFieldGroupProps, RenderableProps<EasyFieldRenderProps>>;
