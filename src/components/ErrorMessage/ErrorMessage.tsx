import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { ErrorMessageProps } from './ErrorMessage.types';
import { useFieldClassName, useDebouncedValue } from '../../utils';
import { NoticeIcon, NOTICE_TYPE } from '../Notice';
import './ErrorMessage.less';

const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ children, text, className, loading: loadingProp, ...other }, ref) => {
    const classPrefix = useFieldClassName('error-message');
    // we will debounce the loading state to
    // minimise DOM updates between rapid successive changes
    // e.g. if the `loading` prop is set based on an instantly fulfilled Promise
    const loading = useDebouncedValue(loadingProp);

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
