import type {
  ComponentPropsWithRef,
  SVGAttributes,
  ElementType,
  ReactNode,
} from 'react';

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

export type NoticeProps<C extends ElementType = ElementType> = {
  component?: C;
  type?: NOTICE_TYPE;
  /**
   * Alias for `type`
   */
  variant?: NOTICE_TYPE;
  text?: ReactNode;
} & ComponentPropsWithRef<C>;
