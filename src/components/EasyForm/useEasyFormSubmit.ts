import { useCallback } from 'react';
import { FORM_ERROR } from 'final-form';
import type { FormApi, SubmissionErrors } from 'final-form';

const useEasyFormSubmit = (onSubmit?: Function) =>
  useCallback(
    async (
      values: any,
      form: FormApi<any, Partial<any>>,
      callback?: (errors?: SubmissionErrors) => void
    ) => {
      // handle an onSubmit not being provided
      // so we can still render the form to make use of its state
      // even without the ability to submit
      try {
        const submit =
          typeof onSubmit === 'function' ? onSubmit : () => Promise.resolve();
        const result = await submit(values, form, callback);
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
