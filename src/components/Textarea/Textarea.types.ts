import { TextareaHTMLAttributes } from 'react';
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * only included so that it is prevented from being
   * added as an attribute to the textarea
   */
  type?: string;
}
