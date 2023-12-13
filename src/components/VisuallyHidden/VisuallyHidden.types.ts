import type { ElementType, ReactNode } from 'react';
import type { Dictionary } from '../../utils/constants';

export interface VisuallyHiddenProps extends Dictionary {
  /**
   * The outer element to render for the component
   * @default 'span'
   */
  component?: ElementType;
  className?: string;
  /**
   * Indicates that the VisuallyHidden `component` is a focusable element,
   * and should be made visible when it receives focus / is active
   * @default false
   */
  focusable?: boolean;
  children?: ReactNode;
  text?: ReactNode;
}
