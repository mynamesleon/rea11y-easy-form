import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

/**
 * A simple component to render content only visible to screen-reader users.
 *
 * Can use `children` for the content, or the `text` prop,
 * which will better leverage memoisation.
 */
export type VisuallyHiddenProps = {
  /**
   * The outer element to render for the component
   * @default 'span'
   */
  as?: ElementType;
  /**
   * Indicates that the VisuallyHidden `component` is a focusable element,
   * and should be made visible when it receives focus / is active
   * @default false
   */
  focusable?: boolean;
  text?: ReactNode;
} & ComponentPropsWithRef<'span'>;
