import type { ReactNode } from 'react';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';

type FieldRepeaterItemRendererChildrenArg = {
  length: number;
  index: number;
  name: string;
};

export interface FieldRepeaterItemRendererProps {
  children: (arg: FieldRepeaterItemRendererChildrenArg) => ReactNode;
  fields: FieldArrayInput<any>;
}