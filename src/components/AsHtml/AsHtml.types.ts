import DOMPurify from 'dompurify';
import type { ReactNode } from 'react';

export interface AsHtmlProps {
  /**
   * Whether to sanitize the provided value
   */
  sanitize?: boolean;
  /**
   * Value to sanitize
   */
  children?: ReactNode;
  /**
   * Value to sanitize (so that you can pass a simple string prop instead of children)
   */
  value?: ReactNode;
  /**
   * Alias for `value`
   */
  html?: ReactNode;
  /**
   * html sanitisation options (from dompurify)
   */
  options?: DOMPurify.Config;
  /**
   * className to add to the div container
   */
  className?: string;
}
