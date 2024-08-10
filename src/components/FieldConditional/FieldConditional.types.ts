import type { ReactNode } from 'react';
import type { UseCheckFieldValueConfig } from '../../utils/useCheckFieldValue/useCheckFieldValue.types';

export interface FieldConditionalProps extends UseCheckFieldValueConfig {
  children?: ReactNode | (() => ReactNode | null) | undefined;
}
