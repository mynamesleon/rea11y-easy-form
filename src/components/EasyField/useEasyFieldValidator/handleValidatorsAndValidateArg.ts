import type { FieldValidator } from 'final-form';
import { useEasyFormContext } from '../../EasyForm';
import type { EasyFieldValidationRule } from '../EasyField.types';
import { isNullOrUndefined, isThenable } from '../../../utils';
import handleValidatorOutcome from './handleValidatorOutcome';

const handleValidateArg = (
  validate: FieldValidator<any> | undefined,
  args: Parameters<FieldValidator<any>>
) => {
  if (typeof validate === 'function') {
    return validate(...args);
  }
};

const handleValidators = (
  validators: [string, EasyFieldValidationRule][],
  defaultFieldValidationFunctions: ReturnType<
    typeof useEasyFormContext
  >['defaultFieldValidationFunctions'],
  args: Parameters<FieldValidator<any>>
): string | Promise<string> | undefined => {
  // if the field has no value, do not run any other validators;
  // but we will allow field values that are reference value types
  // (and even booleans) to trigger further rules
  // as these may indicate more complex field components
  const [value] = args;
  if (isNullOrUndefined(value) || value === '') {
    return;
  }

  // set up promise storage for Promise variant handling later...
  const promiseResults: Promise<any>[] = [];

  // cycle through chosen validator functions
  for (const [key, val] of validators) {
    const validatorFunc =
      typeof val === 'function' ? val : defaultFieldValidationFunctions[key];
    const result = validatorFunc(...args);

    // add to Promise storage,
    // and then only return a Promise if we need to
    if (isThenable(result)) {
      promiseResults.push(
        result.then((outcome: any) => {
          if (outcome) {
            return handleValidatorOutcome(outcome, key, val);
          }
        })
      );
    }

    // if the function is not async, and returned a value,
    // return immediately and do not execute any other validation funcs;
    // this allows us to keep this as a sync function
    else if (result) {
      return handleValidatorOutcome(result, key, val);
    }
  }

  // now handle all the Promise validators...
  // we will build a Promise chain
  const promisesLength = promiseResults.length;
  if (promisesLength) {
    let promiseResult: Promise<any> = Promise.resolve();
    for (let i = 0; i < promisesLength; i += 1) {
      const promiseValidator = promiseResults[i];
      promiseResult = promiseResult.then((outcome) => {
        if (outcome) return outcome;
        return promiseValidator;
      });
    }
    return promiseResult;
  }
};

const handleValidatorsAndValidateArg = (
  validators: [string, EasyFieldValidationRule][],
  validate: FieldValidator<any> | undefined,
  defaultFieldValidationFunctions: ReturnType<
    typeof useEasyFormContext
  >['defaultFieldValidationFunctions'],
  args: Parameters<FieldValidator<any>>
): any | Promise<any> => {
  const handleValidatorsResult = handleValidators(
    validators,
    defaultFieldValidationFunctions,
    args
  );
  if (isThenable(handleValidatorsResult)) {
    return (handleValidatorsResult as Promise<any>).then((outcome) => {
      if (outcome) return outcome;
      return handleValidateArg(validate, args);
    });
  }

  if (handleValidatorsResult) {
    return handleValidatorOutcome(handleValidatorsResult);
  }

  // call provided validate method last
  return handleValidateArg(validate, args);
};

export default handleValidatorsAndValidateArg;
