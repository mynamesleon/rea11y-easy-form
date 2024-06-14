import type { FieldState } from 'final-form';
import type { FieldMetaState, UseFieldConfig } from 'react-final-form';

export type FieldArrayInput<FieldValue> = {
  forEach: (iterator: (name: string, index: number) => void) => void;
  insert: (index: number, value: FieldValue) => void;
  map: <R>(iterator: (name: string, index: number) => R) => R[];
  move: (from: number, to: number) => void;
  update: (index: number, value: FieldValue) => void;
  name: string;
  pop: () => FieldValue;
  push: (value: FieldValue) => void;
  remove: (index: number) => FieldValue;
  shift: () => FieldValue;
  swap: (indexA: number, indexB: number) => void;
  unshift: (value: FieldValue) => void;
  value: FieldValue[];
  length: number;
} & FieldState<FieldValue[]>;

export interface FieldArrayRenderProps<FieldValue> {
  fields: FieldArrayInput<FieldValue>;
  input: FieldArrayInput<FieldValue>;
  meta: FieldMetaState<FieldValue>;
}

export interface UseFieldArrayConfig<FieldValue>
  extends UseFieldConfig<FieldValue[]> {
  isEqual?: (a: any[], b: any[]) => boolean;
}
