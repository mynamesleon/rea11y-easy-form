import { useCallback } from 'react';
import { useDeepCompareMemo } from '@react-hookz/web';
import { useEasyFormContext } from '../EasyForm/EasyFormContext';
import { capitaliseFirstLetter, isNullOrUndefined } from '../../utils';

import type { FieldValidator } from 'final-form';
import type { Dictionary } from '../../utils';
import type { EasyFieldValidationRule } from './EasyField.types';

const useEasyFieldValidator = (
  requiredArg?: EasyFieldValidationRule,
  validation?: Dictionary<EasyFieldValidationRule>,
  validate?: FieldValidator<any>
) => {
  const { defaultFieldValidationFunctions } = useEasyFormContext();
  const { required, ...otherValidation } = validation || {};
  const validators = useDeepCompareMemo(
    () =>
      Object.entries(validation || {}).filter(
        ([key, value]) =>
          typeof value === 'function' ||
          (Boolean(value) &&
            typeof defaultFieldValidationFunctions[key] === 'function')
      ),
    [otherValidation, defaultFieldValidationFunctions]
  );

  const requiredFunc =
    typeof requiredArg === 'function'
      ? requiredArg
      : typeof required === 'function'
        ? required
        : required || requiredArg
          ? defaultFieldValidationFunctions.required
          : null;

  const requiredString =
    typeof requiredArg === 'string'
      ? requiredArg
      : typeof required === 'string'
        ? required
        : 'Required';

  const finalValidator: FieldValidator<any> = useCallback(
    async (...args) => {
      // check required rule before anything else
      if (typeof requiredFunc === 'function') {
        const result = await requiredFunc(...args);
        if (result) {
          return typeof result === 'string' ? result : requiredString;
        }
      }
      // if the field has no value, do not run any other validators;
      // but we will allow field values that are reference value types
      // (and even booleans) to trigger further rules
      // as these may indicate more complex field components
      const [value] = args;
      if (isNullOrUndefined(value) || value === '') {
        return;
      }
      // cycle through chosen validator functions
      for (const [key, val] of validators) {
        const validatorFunc =
          typeof val === 'function'
            ? val
            : defaultFieldValidationFunctions[key];
        const result = await validatorFunc(...args);
        if (result) {
          return typeof result === 'string'
            ? result
            : typeof val === 'string'
              ? val
              : capitaliseFirstLetter(key);
        }
      }
      // call provided validate method last
      if (typeof validate === 'function') {
        return validate(...args);
      }
    },
    [
      defaultFieldValidationFunctions,
      requiredString,
      requiredFunc,
      validators,
      validate,
    ]
  );

  const validatorNeeded = Boolean(
    requiredFunc || validators.length || typeof validate === 'function'
  );
  return {
    isRequired: Boolean(requiredFunc),
    handleValidate: validatorNeeded ? finalValidator : undefined,
  };
};

export default useEasyFieldValidator;
