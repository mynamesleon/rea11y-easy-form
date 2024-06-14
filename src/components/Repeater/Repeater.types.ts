import type { ReactNode } from 'react';
import type { UseFieldConfig } from 'react-final-form';
import type {
  RepeaterContextPropsBase,
  RepeaterContextStrings,
} from './RepeaterContext.types';
import type { RepeaterContentProps } from './RepeaterContent.types';

export interface RepeaterProps
  extends RepeaterContextPropsBase,
    RepeaterContentProps,
    UseFieldConfig<any> {
  strings?: RepeaterContextStrings;
  name: string;
  /**
   * Content for a `<legend>`.
   * If used, the `Repeater` will be rendered inside a `<Fieldset>`
   */
  legend?: ReactNode;
  /**
   * Alias for `legend`
   */
  label?: ReactNode;
}
