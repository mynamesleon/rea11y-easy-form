import clsx from 'clsx';
import { isElement as isReactElement } from 'react-is';
import React, { useMemo, memo } from 'react';
import type { AsHtmlProps } from './AsHtml.types';
import Skeleton, { SKELETON_TYPE } from '../Skeleton';
import { useAsyncOnMount, useFieldClassName } from '../../utils';

const DEFAULT_SANITIZE_OPTIONS = {
  FORBID_TAGS: ['style'],
  FORBID_ATTR: ['style'],
  ALLOW_DATA_ATTR: false,
};

const AsHtml = ({
  sanitize = true,
  className,
  children,
  options,
  value,
  html,
}: AsHtmlProps) => {
  const content = html || value || children;
  const classPrefix = useFieldClassName('html');
  const sanitizeOtions = useMemo(
    () => ({ ...DEFAULT_SANITIZE_OPTIONS, ...options }),
    [options]
  );

  const { result } = useAsyncOnMount(() => import('dompurify'));
  const DOMPurify = result?.default;

  if (!content) {
    return null;
  }

  // return normal react element/node as is
  if (isReactElement(content)) {
    return content;
  }

  const classes = clsx(className, classPrefix);
  const htmlString = content as string;

  // dangerous mode...
  if (!sanitize) {
    return (
      <div
        data-testid="AsHtml"
        className={classes}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    );
  }

  if (!DOMPurify) {
    return <Skeleton type={SKELETON_TYPE.TEXT} />;
  }

  const cleaned = DOMPurify.sanitize(
    htmlString,
    sanitizeOtions
  ) as unknown as string;

  // safe mode...
  if (!cleaned) {
    return null;
  }
  return (
    <div
      data-testid="AsHtml"
      className={classes}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: cleaned }}
    />
  );
};

const MemoisedAsHtml = memo(AsHtml);
MemoisedAsHtml.displayName = 'AsHtml';
export default MemoisedAsHtml;
