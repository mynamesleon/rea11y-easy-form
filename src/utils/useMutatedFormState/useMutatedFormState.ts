import { useRef, useMemo } from 'react';
import { type UseFormStateParams, useFormState } from 'react-final-form';
import type { FormState, SubmissionErrors, ValidationErrors } from 'final-form';

const hasAnyError = (
  errors: ValidationErrors | SubmissionErrors = {}
): boolean =>
  Object.values(errors).some((value) => {
    if (value && typeof value === 'object' && !(value instanceof Error)) {
      return hasAnyError(value);
    }
    return typeof value !== 'undefined';
  });

const storeStatePropBasedOnValidating = (
  formState: FormState<any>,
  stateProp: string,
  acc: FormState<any>
) => {
  const { validating } = formState;
  const statePropValue = formState[stateProp];
  // using refs here and relying on the FormState to trigger updates
  const statePropRef = useRef(statePropValue);
  if (!validating) {
    statePropRef.current = statePropValue;
  }
  // mutate the new object in place so that we do not cause extra re-renders
  acc[stateProp] = validating ? statePropRef.current : statePropValue;
};

const useMutatedFormState = (
  props: Omit<UseFormStateParams, 'onChange'> = {}
) => {
  const subscription =
    'subscription' in props
      ? { ...props.subscription, validating: true }
      : undefined;
  const formState = useFormState({ subscription });

  // ensure we only return a new object reference
  // if the original has also updated;
  // shallow-copy because the original prevents values being set
  const mutatedFormState = useMemo(() => ({ ...formState }), [formState]);

  // handle async validation cases by storing error and errors
  storeStatePropBasedOnValidating(formState, 'error', mutatedFormState);
  storeStatePropBasedOnValidating(formState, 'errors', mutatedFormState);

  // only set `invalid` and `valid` if they were defined in `FormState`,
  // (indicating that they were subscribed to)
  const { invalid, valid, submitError, submitErrors } = formState;
  const mutatedValid = Boolean(
    submitError ||
      mutatedFormState.error ||
      hasAnyError(submitErrors) ||
      hasAnyError(mutatedFormState.errors)
  );
  if (typeof invalid !== 'undefined') {
    mutatedFormState.invalid = invalid || !mutatedValid;
  }
  if (typeof valid !== 'undefined') {
    mutatedFormState.valid = mutatedValid;
  }

  return mutatedFormState;
};

export default useMutatedFormState;
