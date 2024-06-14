import type {
  UseFieldConfig,
  FieldRenderProps,
  RenderableProps,
} from 'react-final-form';
import type { FieldSubscription } from 'final-form';
import type { Dictionary } from '../../../utils/constants';

export interface EasyFieldFieldRenderProps
  extends FieldRenderProps<any, any, any>,
    Dictionary {
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
}

export interface EasyFieldFieldProps
  extends UseFieldConfig<any, any>,
    RenderableProps<EasyFieldFieldRenderProps>,
    Dictionary {
  name: string;
  /**
   * className to be added to the containing div
   */
  className?: string;
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
   * The hook to use for registering the field with react-final-form.
   * Defaults to `useMutatedField`
   */
  useFieldHook?: (
    name: string,
    config?: UseFieldConfig<any> & Dictionary
  ) => FieldRenderProps<any>;
}
