import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

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
} & PropsWithChildren<ComponentProps<'label'>>;
