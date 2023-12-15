import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface ErrorMessageProps extends ComponentPropsWithRef<'div'> {
  loading?: boolean;
  text?: ReactNode;
  className?: string;
}
