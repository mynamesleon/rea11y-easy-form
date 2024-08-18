import { ComponentPropsWithRef, ReactNode } from 'react';
import { Dictionary } from '../../utils';

export type ValidationSummaryError =
  | ReactNode
  | Error
  | (() => ReactNode)
  | any;
export type ValidationSummaryErrors =
  | ValidationSummaryError[]
  | Dictionary<any>;

export interface ValidationSummaryProps extends ComponentPropsWithRef<'div'> {
  header?: ReactNode;
  footer?: ReactNode;
  error?: ValidationSummaryError;
  errors?: ValidationSummaryErrors;
}
