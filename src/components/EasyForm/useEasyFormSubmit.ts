import cloneDeep from 'clone-deep';
import { useCallback } from 'react';
import { FORM_ERROR } from 'final-form';
import type { FormProps } from 'react-final-form';
import { FIELD_REPEATER_ENTRY_KEY } from '../../utils';

const deleteFieldRepeaterKeys = (values: Record<string, any>) => {
  if (typeof values === 'object') {
    delete values[FIELD_REPEATER_ENTRY_KEY];
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        deleteFieldRepeaterKeys(values[key]);
      }
    }
  }
  return values;
};

const processValues = (values: Record<string, any>) => {
  const clone = cloneDeep(values);
  return deleteFieldRepeaterKeys(clone);
};

const useEasyFormSubmit = (onSubmit?: FormProps['onSubmit']) =>
  useCallback<FormProps['onSubmit']>(
    async (values, form, callback) => {
      // handle an onSubmit not being provided
      // so we can still render the form to make use of its state
      // even without the ability to submit
      try {
        const submitValues = processValues(values);
        const submit =
          typeof onSubmit === 'function' ? onSubmit : () => Promise.resolve();
        const result = await submit(submitValues, form, callback);
        return result;
      } catch (err: any) {
        // some very basic default generic form error handling
        // based on the error being a string
        // or an Error construct with a string message
        const message = err?.message || err;
        if (typeof message === 'string' && message) {
          return { [FORM_ERROR]: message };
        }
        // continue the normal promise rejection chain
        // if a generic error message could not be found
        return Promise.reject(err instanceof Error ? err : new Error(err));
      }
    },
    [onSubmit]
  );

export default useEasyFormSubmit;
