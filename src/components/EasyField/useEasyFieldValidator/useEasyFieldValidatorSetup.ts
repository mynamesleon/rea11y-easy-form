import { useDeepCompareMemo } from '@react-hookz/web';
import { useEasyFormContext } from '../../EasyForm';
import type { EasyFieldValidationRule } from '../EasyField.types';
import type { Dictionary } from '../../../utils';

const useEasyFieldValidatorSetup = (
  requiredArg?: EasyFieldValidationRule,
  validation?: Dictionary<EasyFieldValidationRule>
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

  return {
    defaultFieldValidationFunctions,
    requiredString,
    requiredFunc,
    validators,
  };
};

export default useEasyFieldValidatorSetup;
