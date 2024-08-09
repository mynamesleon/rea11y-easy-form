import React, { memo } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import {
  FIELD_CONDITIONAL_LOGIC_TYPE,
  type FieldConditionalProps,
} from './FieldConditional.types';
import useFieldConditionalEvaluator from './useFieldConditionalEvaluator';

const FieldConditionalContent = ({
  ifNotLogic = FIELD_CONDITIONAL_LOGIC_TYPE.AND,
  ifLogic = FIELD_CONDITIONAL_LOGIC_TYPE.AND,
  logic = FIELD_CONDITIONAL_LOGIC_TYPE.AND,
  children,
  ...other
}: FieldConditionalProps) => {
  const ifNotPasses = useFieldConditionalEvaluator(
    other.ifNot || {},
    ifNotLogic,
    false
  );
  const ifPasses = useFieldConditionalEvaluator(other.if || {}, ifLogic, true);

  if (
    (logic === FIELD_CONDITIONAL_LOGIC_TYPE.AND && ifNotPasses && ifPasses) ||
    (logic === FIELD_CONDITIONAL_LOGIC_TYPE.OR && (ifNotPasses || ifPasses))
  ) {
    return typeof children === 'function' ? children() : children;
  }

  return null;
};

const FieldConditional = (props: FieldConditionalProps) => {
  if (!props.if && !props.ifNot) {
    return typeof props.children === 'function'
      ? props.children()
      : props.children;
  }
  return <FieldConditionalContent {...props} />;
};

const MemoisedFieldConditional = memo(FieldConditional, isEqual);
MemoisedFieldConditional.displayName = 'Conditional';
export default MemoisedFieldConditional;
