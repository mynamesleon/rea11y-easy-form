import type { ComponentPropsWithoutRef, SVGAttributes, ReactNode } from 'react';

export enum NOTICE_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export interface NoticeIconProps extends SVGAttributes<SVGElement> {
  loading?: boolean;
  type?: NOTICE_TYPE;
}

export type NoticeProps = {
  type?: NOTICE_TYPE;
  /**
   * Alias for `type`
   */
  variant?: NOTICE_TYPE;
  loading?: boolean;
  text?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;
