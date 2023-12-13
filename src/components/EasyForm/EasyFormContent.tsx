import React, { forwardRef, useMemo } from 'react';
import { useDeepCompareMemo } from '@react-hookz/web';
import { FormSpy } from 'react-final-form';
import {
  EasyFormValidationSummaryModeTypes,
  type EasyFormContentProps,
} from './EasyForm.types';
import EasyFormValidationSummary from './EasyFormValidationSummary';
import { useEasyFormContext } from './EasyFormContext';
import EasyFormBuilder from './EasyFormBuilder';
import { renderComponent } from '../../utils';

const EasyFormContent = forwardRef<HTMLDivElement, EasyFormContentProps>(
  (
    {
      header,
      footer,
      children,
      render,
      component,
      structure,
      // used to determine default button rendering
      hasOnSubmit,
      submitText,
      // validation summary specific
      staticErrors,
      validationSummary,
      // any props below here should be FormState ones,
      ...formState
    },
    ref
  ) => {
    const { disabled: formDisabled = false } = useEasyFormContext();
    // we will memoise any of the form state props for now
    // @todo: need to test if this is beneficial/necessary
    const formStateProps = useDeepCompareMemo(
      () => ({ ...formState }),
      [formState]
    );
    const renderComponentProps = useMemo(
      () => ({
        ...formStateProps,
        component,
        children,
        render,
      }),
      [children, render, component, formStateProps]
    );

    const renderedValidationSummary = useMemo(
      () =>
        validationSummary?.mode !== EasyFormValidationSummaryModeTypes.NONE && (
          <EasyFormValidationSummary
            {...formStateProps}
            validationSummary={validationSummary}
            staticErrors={staticErrors}
            ref={ref}
          />
        ),
      [validationSummary, staticErrors, formStateProps, ref]
    );

    return (
      <>
        {validationSummary?.position === 'beforebegin' &&
          renderedValidationSummary}

        {typeof header === 'function' ? header(formStateProps) : header}

        {validationSummary?.position === 'afterbegin' &&
          renderedValidationSummary}

        <EasyFormBuilder structure={structure} />
        {renderComponent<any>(renderComponentProps)}

        {validationSummary?.position === 'beforeend' &&
          renderedValidationSummary}

        {typeof footer === 'function' ? footer(formStateProps) : footer}

        {!footer && hasOnSubmit && submitText && (
          <FormSpy subscription={{ submitting: true }}>
            {({ submitting }) => (
              <button disabled={formDisabled || submitting} type="submit">
                {submitText}
              </button>
            )}
          </FormSpy>
        )}

        {validationSummary?.position === 'afterend' &&
          renderedValidationSummary}
      </>
    );
  }
);

export default EasyFormContent;
