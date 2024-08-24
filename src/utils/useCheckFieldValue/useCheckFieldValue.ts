import { useMemo } from 'react';
import type { FormApi } from 'final-form';
import { useForm } from 'react-final-form';
import { isEqual } from '@react-hookz/deep-equal';
import useFieldValue from '../useFieldValue';
import isNullOrUndefined from '../isNullOrUndefined';
import type { Dictionary } from '../types';
import {
  USE_CHECK_FIELD_VALUE_LOGIC_MATCHER,
  USE_CHECK_FIELD_VALUE_LOGIC_TYPE,
  UseCheckFieldValueLogicProp,
  type UseCheckFieldValueExpectedValueFunction,
  type UseCheckFieldValueConfig,
} from './useCheckFieldValue.types';

const doesMatchSucceed = (
  expectedValues: (any | UseCheckFieldValueExpectedValueFunction)[],
  actualValues: any[],
  logicType: USE_CHECK_FIELD_VALUE_LOGIC_TYPE,
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
      if (logicType === USE_CHECK_FIELD_VALUE_LOGIC_TYPE.OR) {
        return true;
      } else if (!success) {
        success = true;
      }
    } else if (logicType === USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND) {
      return false;
    }
  }
  return success;
};

const useCheckFieldValueEvaluator = (
  conditionalObject: Dictionary<any | UseCheckFieldValueExpectedValueFunction>,
  logic: UseCheckFieldValueLogicProp,
  seeking: boolean,
  formApi: FormApi
) => {
  const logicType =
    USE_CHECK_FIELD_VALUE_LOGIC_MATCHER[logic?.toLowerCase?.().trim() || ''];
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

const useCheckFieldValue = (
  nameOrConfig?: UseCheckFieldValueConfig | string,
  value?: any
) => {
  const config = useMemo<UseCheckFieldValueConfig>(() => {
    if (typeof nameOrConfig !== 'string') {
      return nameOrConfig || {};
    }
    const result: UseCheckFieldValueConfig = {};
    if (nameOrConfig) {
      result.if = {
        [nameOrConfig]: value,
      };
    }
    return result;
  }, [nameOrConfig, value]);

  const {
    ifNotLogic = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND,
    ifLogic = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND,
    logic = USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND,
  } = config;

  const formApi = useForm('useCheckFieldValue');
  const ifNotPasses = useCheckFieldValueEvaluator(
    config.ifNot || {},
    ifNotLogic,
    false,
    formApi
  );
  const ifPasses = useCheckFieldValueEvaluator(
    config.if || {},
    ifLogic,
    true,
    formApi
  );

  return (
    (logic === USE_CHECK_FIELD_VALUE_LOGIC_TYPE.AND &&
      ifNotPasses &&
      ifPasses) ||
    (logic === USE_CHECK_FIELD_VALUE_LOGIC_TYPE.OR && (ifNotPasses || ifPasses))
  );
};

export default useCheckFieldValue;
