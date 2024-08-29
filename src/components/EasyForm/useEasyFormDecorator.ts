import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsMounted } from '@react-hookz/web';
import type {
  FormApi,
  ValidationErrors,
  SubmissionErrors,
  Decorator,
} from 'final-form';
import {
  type UseEasyFormDecoratorProps,
  EasyFormValidationSummaryModeTypes,
} from './EasyForm.types';
import { focusAndSmoothlyScrollIntoView, isThenable } from '../../utils';

/**
 * final form decorator to handle the static validation summary mode
 * and to move focus to the validation summary after submit attempts
 */
const useEasyFormDecorator = ({
  validationSummary,
  ref,
}: UseEasyFormDecoratorProps): [
  ValidationErrors | undefined,
  Decorator<any, any>,
] => {
  const isMounted = useIsMounted();

  const [staticErrors, setErrors] = useState<ValidationErrors | undefined>();
  // when the errors are set, focus on the validation summary
  useEffect(() => {
    if (staticErrors) {
      focusAndSmoothlyScrollIntoView(ref);
    }
  }, [staticErrors, ref]);

  const decorator: Decorator<any, any> = useCallback(
    (form: FormApi) => {
      const originalSubmit = form.submit;

      // subscribe to errors and keep local copy;
      // doing this here instead of in a FormSpy
      // so that we can more easily set
      // local errors state only after submit attempts
      let state: {
        errors?: ValidationErrors;
        submitErrors?: SubmissionErrors;
      } = {};
      const subscription = { errors: true, submitErrors: true };
      const unsubscribe = form.subscribe((nextState) => {
        state = nextState;
      }, subscription);

      const afterSubmit = () => {
        if (
          validationSummary?.mode === EasyFormValidationSummaryModeTypes.STATIC
        ) {
          const { errors: errs = {}, submitErrors = {} } = state;
          // prioritise submit errors for the static validation summary,
          // unlike the dynamic summary where we prioritise the field errors
          const errors: ValidationErrors = { ...errs, ...submitErrors };
          // check that the component is still mounted for extra safety
          // as we are relying on a subscription
          if (isMounted()) {
            setErrors(errors);
          }
        } else {
          focusAndSmoothlyScrollIntoView(ref);
        }
      };

      // overwrite submit function
      form.submit = () => {
        // clear out any local error state
        // being used for the static validation summary
        setErrors(undefined);
        // handle async or sync submit variant
        const result = originalSubmit.call(form);
        if (isThenable(result)) {
          (result as Promise<any>).then(afterSubmit, () => {});
        } else {
          afterSubmit();
        }
        return result;
      };

      // reset the submit function and unsubscribe when the form is unmounted
      return () => {
        unsubscribe();
        form.submit = originalSubmit;
      };
    },
    [validationSummary?.mode, setErrors, isMounted, ref]
  );

  return useMemo(() => [staticErrors, decorator], [staticErrors, decorator]);
};

export default useEasyFormDecorator;
