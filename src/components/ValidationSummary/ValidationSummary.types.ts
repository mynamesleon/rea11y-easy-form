import { ComponentPropsWithRef, ReactNode } from 'react';
import { Dictionary } from '../../utils';
import { NoticeProps } from '../Notice/Notice.types';

export type ValidationSummaryError =
  | ReactNode
  | Error
  | (() => ReactNode)
  | any;
export type ValidationSummaryErrors =
  | ValidationSummaryError[]
  | Dictionary<any>;

export interface ValidationSummaryProps
  extends Omit<NoticeProps, 'type' | 'variant'>,
    ComponentPropsWithRef<'div'> {
  header?: ReactNode;
  footer?: ReactNode;
  error?: ValidationSummaryError;
  errors?: ValidationSummaryErrors;
}
