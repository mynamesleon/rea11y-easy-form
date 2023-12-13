import type { ElementType, ReactNode, SVGAttributes } from 'react';
import { Dictionary } from '../../utils/constants';

export enum NOTICE_TYPE {
  LOADING = 'loading',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export interface NoticeIconProps extends SVGAttributes<SVGElement> {
  type?: NOTICE_TYPE;
}

export interface NoticeProps extends Dictionary {
  component?: ElementType;
  children?: ReactNode;
  type?: NOTICE_TYPE;
  /**
   * Alias for `type`
   */
  variant?: NOTICE_TYPE;
  className?: string;
  text?: ReactNode;
}
