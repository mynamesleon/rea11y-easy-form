import type { ReactNode } from 'react';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';

type RepeaterItemRendererChildrenArg = {
  length: number;
  index: number;
  name: string;
};

export interface RepeaterItemRendererProps {
  children: (arg: RepeaterItemRendererChildrenArg) => ReactNode;
  fields: FieldArrayInput<any>;
}
