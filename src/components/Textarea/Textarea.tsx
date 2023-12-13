import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { useFieldClassName } from '../../utils';
import type { TextareaProps } from './Textarea.types';
import './Textarea.less';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ type, className, ...other }, ref) => {
    const classPrefix = useFieldClassName('textarea');
    return (
      <textarea
        data-testid="Textarea"
        {...other}
        className={clsx(className, classPrefix)}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
