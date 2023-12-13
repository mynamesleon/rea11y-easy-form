import { HTMLAttributes, ReactNode } from 'react';
import { Dictionary } from '../../utils/constants';

export type ValidationSummaryError =
  | ReactNode
  | Error
  | (() => ReactNode)
  | any;
export type ValidationSummaryErrors =
  | ValidationSummaryError[]
  | Dictionary<any>;

export interface ValidationSummaryProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  error?: ValidationSummaryError;
  errors?: ValidationSummaryErrors;
}
