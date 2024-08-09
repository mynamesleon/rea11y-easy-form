import type { ReactNode } from 'react';
import { Dictionary } from '../../utils';

export type FieldConditionalLogicProp =
  | 'AND'
  | 'and'
  | '&&'
  | 'OR'
  | 'or'
  | '||';

export enum FIELD_CONDITIONAL_LOGIC_TYPE {
  AND = 'AND',
  OR = 'OR',
}

export enum FIELD_CONDITIONAL_LOGIC_MATCHER {
  'and' = FIELD_CONDITIONAL_LOGIC_TYPE.AND,
  '&&' = FIELD_CONDITIONAL_LOGIC_TYPE.AND,
  'or' = FIELD_CONDITIONAL_LOGIC_TYPE.OR,
  '||' = FIELD_CONDITIONAL_LOGIC_TYPE.OR,
}

export type FieldConditionalExpectedValue = (actualValue?: any) => boolean;

export interface FieldConditionalProps {
  logic?: FieldConditionalLogicProp;
  if?: Dictionary<any | FieldConditionalExpectedValue>;
  ifLogic?: FieldConditionalLogicProp;
  ifNot?: Dictionary<any | FieldConditionalExpectedValue>;
  ifNotLogic?: FieldConditionalLogicProp;
  children?: ReactNode | (() => ReactNode | null) | undefined;
}
