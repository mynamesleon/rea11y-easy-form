import React, { memo } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import { type FieldConditionalProps } from './FieldConditional.types';
import { useCheckFieldValue } from '../../utils';

const FieldConditionalContent = ({
  children,
  ...config
}: FieldConditionalProps) => {
  const configPasses = useCheckFieldValue(config);
  if (!configPasses) {
    return null;
  }
  if (typeof children === 'function') {
    return children();
  }
  return children;
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
