import { useRef, useMemo } from 'react';
import { type UseFieldConfig, useFormState, useField } from 'react-final-form';

const useMutatedField = (name: string, config?: UseFieldConfig<any>) => {
  const { input, meta } = useField(name, config);
  const { error, validating, invalid, valid } = meta;

  // for optimisation, we should ideally only subscribe to the form's
  // validating state when the field has asynchronous validation,
  // but we cannot know if `validate` returns a Promise without calling it,
  // so as a middle ground we will just subscribe if the function exists
  const { validating: formValidating } = useFormState({
    subscription: {
      validating: typeof config?.validate === 'function',
    },
  });

  // ensure we only return a new meta object reference
  // if the original has also updated;
  // shallow-copy because the original prevents values being set
  const mutatedMeta = useMemo(() => ({ ...meta }), [meta]);

  // the Field validating state resets even when async validation is happening,
  // so we will store validating state when it is initially set to true,
  // and reset the ref when the whole form has finished validating
  const validatingRef = useRef(false);
  if (validating) {
    validatingRef.current = true;
  }
  if (!validating && !formValidating) {
    validatingRef.current = false;
  }
  // update mutatedMeta
  mutatedMeta.validating = validating || Boolean(validatingRef.current);

  // store previous error state to handle async validation cases
  // (where the `error` and `valid`/`invalid` are reset);
  // using a ref here and relying on the Field and Form States for updates
  // instead of useState, which would cause extra re-renders
  const errorRef = useRef(error);
  if (!mutatedMeta.validating) {
    errorRef.current = error;
  }
  // now mutate the new object in place so that we do not cause extra re-renders
  mutatedMeta.error = error || errorRef.current;

  // only set `invalid` and `valid` if they were defined in `meta`,
  // (indicating that they were subscribed to)
  if (typeof invalid !== 'undefined') {
    mutatedMeta.invalid = invalid || Boolean(mutatedMeta.error);
  }
  if (typeof valid !== 'undefined') {
    mutatedMeta.valid = mutatedMeta.error ? false : valid;
  }

  return { input, meta: mutatedMeta };
};

export default useMutatedField;
