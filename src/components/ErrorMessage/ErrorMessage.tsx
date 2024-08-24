import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { ErrorMessageProps } from './ErrorMessage.types';
import { useFieldClassName } from '../../utils';
import { NoticeIcon, NOTICE_TYPE } from '../Notice';
import './ErrorMessage.less';

const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ children, text, className, loading, ...other }, ref) => {
    const classPrefix = useFieldClassName('error-message');
    if (!children && !text) {
      return null;
    }
    return (
      <div
        data-testid="ErrorMessage"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix)}
        // aria-busy is only really relevant if this is a live region,
        // but we will set it anyway just in case
        aria-busy={loading}
      >
        <span className={`${classPrefix}__icon`} aria-hidden="true">
          <NoticeIcon loading={loading} type={NOTICE_TYPE.ERROR} />
        </span>
        {children || text}
      </div>
    );
  }
);

const Memoised = memo(ErrorMessage);
Memoised.displayName = 'ErrorMessage';
export default Memoised;
