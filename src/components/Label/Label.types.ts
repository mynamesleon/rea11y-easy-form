import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export type LabelProps = {
  text?: ReactNode;
  /**
   * Used to indicate that an asterisk should be rendered
   * @default false
   */
  required?: boolean;
  /**
   * Text used for `title` and `aria-label` attributes on the asterisk element
   */
  srRequiredText?: string;
  /**
   * The element to use,
   * e.g. can be passed a `'div'` if `htmlFor` will be empty
   * to prevent orphaned labels
   * @default 'label'
   */
  component?: ElementType;
} & ComponentPropsWithRef<'label'>;
