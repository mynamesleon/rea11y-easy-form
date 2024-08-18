import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ButtonProps = {
  /**
   * Can be used in place of `children`;
   * this will better leverage memoisation when a string is used
   */
  text?: ReactNode;
  /**
   * Used for a modifier className
   */
  variant?: string;
} & ComponentPropsWithoutRef<'button'>;
