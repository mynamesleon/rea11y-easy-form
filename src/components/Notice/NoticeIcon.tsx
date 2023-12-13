import React, { memo } from 'react';
import { NoticeIconProps, NOTICE_TYPE } from './Notice.types';
import { ExclamationIcon, TickIcon, InfoIcon, LoadingIcon } from '../../icons';

const NoticeIcon = ({ type, ...other }: NoticeIconProps) => {
  switch (type) {
    case NOTICE_TYPE.ERROR:
    case NOTICE_TYPE.WARNING:
      return <ExclamationIcon data-testid="NoticeIcon" {...other} />;

    case NOTICE_TYPE.LOADING:
      return <LoadingIcon data-testid="NoticeIcon" {...other} />;

    case NOTICE_TYPE.SUCCESS:
      return <TickIcon data-testid="NoticeIcon" {...other} />;

    case NOTICE_TYPE.INFO:
    default:
      return <InfoIcon data-testid="NoticeIcon" {...other} />;
  }
};

const MemoisedNoticeIcon = memo(NoticeIcon);
MemoisedNoticeIcon.displayName = 'NoticeIcon';
export default MemoisedNoticeIcon;
