import { useCallback } from 'react';
import type { FieldValidator } from 'final-form';
import type { EasyFieldValidationRule } from '../EasyField.types';
import { type Dictionary, isThenable } from '../../../utils';
import handleValidatorsAndValidateArg from './handleValidatorsAndValidateArg';
import useEasyFieldValidatorSetup from './useEasyFieldValidatorSetup';
import handleValidatorOutcome from './handleValidatorOutcome';

const useEasyFieldValidator = (
  requiredArg?: EasyFieldValidationRule,
  validation?: Dictionary<EasyFieldValidationRule>,
  validate?: FieldValidator<any>
) => {
  const {
    defaultFieldValidationFunctions,
    requiredString,
    requiredFunc,
    validators,
  } = useEasyFieldValidatorSetup(requiredArg, validation);

  const finalValidator: FieldValidator<any> = useCallback(
    (...args) => {
      // check required rule before anything else
      if (typeof requiredFunc === 'function') {
        const requiredFuncResult = requiredFunc(...args);
        // if the `requiredFunc` is thenable,
        // then we can just use Promise.resolve() on the rest,
        // as we will be returning a Promise anyway
        if (isThenable(requiredFuncResult)) {
          return (requiredFuncResult as Promise<any>).then((outcome) => {
            if (outcome) {
              return handleValidatorOutcome(outcome, requiredString);
            }
            return handleValidatorsAndValidateArg(
              validators,
              validate,
              defaultFieldValidationFunctions,
              args
            );
          });
        }
        // if the requiredFuncResult is truthy otherwise, return as the required error message
        if (requiredFuncResult) {
          return handleValidatorOutcome(requiredFuncResult, requiredString);
        }
      }

      return handleValidatorsAndValidateArg(
        validators,
        validate,
        defaultFieldValidationFunctions,
        args
      );
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
