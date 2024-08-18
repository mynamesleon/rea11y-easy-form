import type { Dictionary } from '../types';

export type UseCheckFieldValueLogicProp =
  | 'AND'
  | 'and'
  | '&&'
  | 'OR'
  | 'or'
  | '||';

export enum USE_CHECK_FIELD_VALUE_LOGIC_TYPE {
  AND = 'AND',
  OR = 'OR',
}

export enum USE_CHECK_FIELD_VALUE_LOGIC_MATCHER {
  'and' = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND,
  '&&' = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND,
  'or' = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.OR,
  '||' = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.OR,
}

export type UseCheckFieldValueExpectedValueFunction = (
  actualValue?: any
) => boolean;

export interface UseCheckFieldValueConfig {
  logic?: UseCheckFieldValueLogicProp;
  if?: Dictionary<any | UseCheckFieldValueExpectedValueFunction>;
  ifLogic?: UseCheckFieldValueLogicProp;
  ifNot?: Dictionary<any | UseCheckFieldValueExpectedValueFunction>;
  ifNotLogic?: UseCheckFieldValueLogicProp;
}
