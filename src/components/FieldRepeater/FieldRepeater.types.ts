import type { ReactNode } from 'react';
import type { UseFieldConfig } from 'react-final-form';
import type {
  FieldRepeaterContextPropsBase,
  FieldRepeaterContextStrings,
} from './FieldRepeaterContext.types';
import type { FieldRepeaterContentProps } from './FieldRepeaterContent.types';

export interface FieldRepeaterProps
  extends FieldRepeaterContextPropsBase,
    FieldRepeaterContentProps,
    UseFieldConfig<any> {
  strings?: FieldRepeaterContextStrings;
  name: string;
  /**
   * Content for a `<legend>`.
   * If used, the `FieldRepeater` will be rendered inside a `<Fieldset>`
   */
  legend?: ReactNode;
  /**
   * Alias for `legend`
   */
  label?: ReactNode;
}
