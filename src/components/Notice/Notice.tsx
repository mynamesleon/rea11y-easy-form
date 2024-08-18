import clsx from 'clsx';
import React, { memo, useMemo } from 'react';
import { type NoticeProps, NOTICE_TYPE } from './Notice.types';
import { polymorphicForwardRef, useFieldClassName } from '../../utils';
import NoticeIcon from './NoticeIcon';
import './Notice.less';

const POSSIBLE_NOTICE_TYPE = Object.values(NOTICE_TYPE);
const DEFAULT_NOTICE_TYPE = NOTICE_TYPE.INFO;

const Notice = polymorphicForwardRef<'div', NoticeProps>(
  (
    {
      as: Component = 'div',
      type: typeProp,
      className,
      children,
      variant,
      text,
      ...other
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('notice');
    // enforce type match if an invalid type is used
    const type = useMemo(() => {
      if (typeProp && POSSIBLE_NOTICE_TYPE.includes(typeProp)) {
        return typeProp;
      }
      if (variant && POSSIBLE_NOTICE_TYPE.includes(variant)) {
        return variant;
      }
      return DEFAULT_NOTICE_TYPE;
    }, [typeProp, variant]);

    if (!text && !children) {
      return null;
    }

    return (
      <Component
        data-testid="Notice"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix, `${classPrefix}--${type}`)}
      >
        <span
          className={`${classPrefix}__icon ${classPrefix}__icon--${type}`}
          aria-hidden="true"
        >
          <NoticeIcon
            className={`${classPrefix}__svg`}
            focusable={false}
            type={type}
          />
        </span>
        <div className={`${classPrefix}__content`}>
          {text}
          {children}
        </div>
      </Component>
    );
  }
);

const MemoisedNotice = memo(Notice);
MemoisedNotice.displayName = 'Notice';
export default MemoisedNotice as typeof Notice;
