import type { ComponentPropsWithRef } from 'react';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  /**
   * only included so that it is prevented from being
   * added as an attribute to the textarea
   */
  type?: string;
}
