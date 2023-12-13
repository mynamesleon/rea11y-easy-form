import type { HTMLAttributes, ReactNode } from 'react';

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  children?: ReactNode;
  text?: ReactNode;
  className?: string;
}
