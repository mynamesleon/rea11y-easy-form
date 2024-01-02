import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /**
   * Can be used in place of `children`;
   * this will better leverage memoisation when a string is used
   */
  text?: ReactNode;
  /**
   * Used for a modifier className
   */
  variant?: string;
  component?: ElementType;
}
