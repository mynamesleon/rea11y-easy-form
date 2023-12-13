import type { ElementType, ReactNode } from 'react';
import type { Dictionary } from '../../utils/constants';

export interface LabelProps extends Dictionary {
  text?: ReactNode;
  /**
   * Used to indicate that an asterisk should be rendered
   * @default false
   */
  required?: boolean;
  children?: ReactNode;
  className?: string;
  /**
   * Text used for `title` and `aria-label` attributes on the asterisk element
   */
  srRequiredText?: string;
  component?: ElementType;
  htmlFor?: string;
}
