import type { FormApi } from 'final-form';
import { useForm } from 'react-final-form';
import { isEqual } from '@react-hookz/deep-equal';
import { type Dictionary, useFieldValue, isNullOrUndefined } from '../../utils';
import {
  FIELD_CONDITIONAL_LOGIC_MATCHER,
  FIELD_CONDITIONAL_LOGIC_TYPE,
  FieldConditionalLogicProp,
  type FieldConditionalExpectedValue,
} from './FieldConditional.types';

const doesMatchSucceed = (
  expectedValues: (any | FieldConditionalExpectedValue)[],
  actualValues: any[],
  logicType: FIELD_CONDITIONAL_LOGIC_TYPE,
  seeking: boolean,
  formApi: FormApi
) => {
  let success = false;
  for (let i = 0, l = expectedValues.length; i < l; i += 1) {
    const expectedValue = expectedValues[i];
    const actualValue = actualValues[i];
    const initialMatches =
      typeof expectedValue === 'object' && !isNullOrUndefined(expectedValue)
        ? isEqual(expectedValue, actualValue)
        : typeof expectedValue === 'function'
        ? Boolean(expectedValue(actualValue, formApi))
        : expectedValue === actualValue;

    const matches = seeking === true ? initialMatches : !initialMatches;

    if (matches) {
      if (logicType === FIELD_CONDITIONAL_LOGIC_TYPE.OR) {
        return true;
      } else if (!success) {
        success = true;
      }
    } else if (logicType === FIELD_CONDITIONAL_LOGIC_TYPE.AND) {
      return false;
    }
  }
  return success;
};

const useFieldConditionalEvaluator = (
  conditionalObject: Dictionary<any | FieldConditionalExpectedValue>,
  logic: FieldConditionalLogicProp,
  seeking: boolean
) => {
  const formApi = useForm();
  const logicType =
    FIELD_CONDITIONAL_LOGIC_MATCHER[logic?.toLowerCase?.().trim() || ''];
  const keysAndExpectedValues = Object.entries(conditionalObject || {});
  const keys = keysAndExpectedValues.map(([key]) => key);
  const actualValues = useFieldValue(keys);
  if (!keys.length) {
    return true;
  }
  const expectedValues = keysAndExpectedValues.map(([_, value]) => value);
  return doesMatchSucceed(
    expectedValues,
    actualValues,
    logicType,
    seeking,
    formApi
  );
};

export default useFieldConditionalEvaluator;
