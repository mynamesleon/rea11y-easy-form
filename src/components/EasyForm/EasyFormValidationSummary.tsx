import React, { forwardRef } from 'react';
import { useDeepCompareMemo } from '@react-hookz/web';
import type { FormApi, ValidationErrors } from 'final-form';
import { useForm, useFormState } from 'react-final-form';
import {
  type EasyFormValidationSummaryProps,
  EasyFormValidationSummaryModeTypes,
  EasyFormValidationSummaryContentTypes,
} from './EasyForm.types';
import ValidationSummary from '../ValidationSummary';
import {
  FIELD_DATA_LABEL_KEY,
  flattenObject,
  extractKeysForSubscription,
} from '../../utils';
import MutatedFormSpy from '../MutatedFormSpy';

const getErroredFieldsDataLabels = (
  errors: ValidationErrors,
  formApi: FormApi
) => {
  const flattenedErrors = flattenObject(errors, {
    flattenArrays: true,
    flattenErrors: false,
    flattenReactNodes: false,
  });
  const result = {};
  for (const key in flattenedErrors) {
    if (flattenedErrors.hasOwnProperty(key)) {
      const fieldState = formApi.getFieldState(key);
      const label = fieldState?.data?.[FIELD_DATA_LABEL_KEY];
      if (label) {
        result[key] = label;
      }
    }
  }
  return result;
};

const determineErrors = (
  contentType: EasyFormValidationSummaryContentTypes | undefined,
  errors: ValidationErrors,
  formApi: FormApi
) =>
  contentType === EasyFormValidationSummaryContentTypes.LABELS
    ? getErroredFieldsDataLabels(errors, formApi)
    : errors;

const EasyFormValidationSummary = forwardRef<
  HTMLDivElement,
  EasyFormValidationSummaryProps
>(({ staticErrors, validationSummary }, ref) => {
  const formApi = useForm('EasyFormValidationSummary');
  const {
    // destructure `position` out so that it does not
    // end up as an attribute on the rendered div
    position,
    content: contentType,
    renderLogic,
    render,
    mode,
    ...headerFooter
  } = validationSummary || {};
  // determine our subscription for validation summary visibility logic
  const subscription = useDeepCompareMemo(
    () => ({
      ...extractKeysForSubscription(renderLogic, (key: string) => key),
      // always subscribe to the submitError, and validating states
      submitError: true,
      validating: true,
    }),
    [renderLogic]
  );
  // now check the form state against the renderLogic
  const formState = useFormState({ subscription });
  const shouldShowErrors = useDeepCompareMemo(() => {
    for (const entry in renderLogic) {
      if (
        renderLogic.hasOwnProperty(entry) &&
        Boolean(renderLogic[entry]) !== Boolean(formState[entry])
      ) {
        return false;
      }
    }
    return true;
  }, [formState, renderLogic]);

  // no need to check against the `mode` here, as that check is done in
  // `<EasyFormContent>`, to avoid any unneeded form subscriptions
  if (!shouldShowErrors) {
    return null;
  }

  // the validationSummary function case override all others
  if (typeof render === 'function') {
    return render(ref) || null;
  }

  const { validating } = formState;

  // ignore other validationSummary behaviour when a whole form submit error exists,
  // as we always want to prioritise this, just in case
  if (formState.submitError) {
    return (
      <ValidationSummary
        error={formState.submitError}
        loading={validating}
        role="alert"
        ref={ref}
      />
    );
  }

  // we can more safely use the alert role for the static validation summary
  // as even though this also implicitly sets aria-live to assertive and aria-atomic to true,
  // the summary will not regularly re-render in this scenario
  // @note: re-test this across screen readers, as we are using the decorator
  // to move focus to the validation summary as well,
  // and need to make sure that does not cause a duplicate announcement
  if (mode === EasyFormValidationSummaryModeTypes.STATIC) {
    const finalErrors = determineErrors(contentType, staticErrors, formApi);
    return (
      <ValidationSummary
        loading={validating}
        errors={finalErrors}
        role="alert"
        ref={ref}
        {...headerFooter}
      />
    );
  }

  // for dynamic validation summary case, we subscribe to submitErrors and errors;
  // we do not want to rely on subscribing to these at the form level,
  // as that would destroy performance, so we will instead spy on those states here
  if (mode === EasyFormValidationSummaryModeTypes.DYNAMIC) {
    return (
      <MutatedFormSpy subscription={{ submitErrors: true, errors: true }}>
        {({ submitErrors, errors }) => {
          // prioritise standard errors over submit errors in this case,
          // as these are the ones more likely to change when the user
          // makes corrections within the form
          const errs = { ...submitErrors, ...errors };
          const finalErrors = determineErrors(contentType, errs, formApi);
          return (
            <ValidationSummary
              loading={validating}
              errors={finalErrors}
              ref={ref}
              {...headerFooter}
            />
          );
        }}
      </MutatedFormSpy>
    );
  }

  return null;
});

export default EasyFormValidationSummary;
