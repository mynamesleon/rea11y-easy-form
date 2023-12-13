import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import React, { forwardRef, useRef, useMemo, memo } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import setFieldData from 'final-form-set-field-data';
import type { EasyFormFormProps } from './EasyForm.types';
import useEasyFormDecorator from './useEasyFormDecorator';
import useEasyFormSubmit from './useEasyFormSubmit';
import EasyFormContent from './EasyFormContent';
import { MUTATOR_SET_FIELD_DATA_KEY, useFieldClassName } from '../../utils';

const DEFAULT_FORM_SUBSCRIPTION = {};
const DEFAULT_FORM_DECORATORS = [];
const DEFAULT_FORM_MUTATORS = {};

const EasyFormForm = forwardRef<HTMLFormElement, EasyFormFormProps>(
  (
    {
      decorators = DEFAULT_FORM_DECORATORS,
      mutators = DEFAULT_FORM_MUTATORS,
      submitText = 'Submit',
      validationSummary,
      className,
      onSubmit,
      // below props to be specifically passed to EasyFormContent
      structure,
      component,
      children,
      render,
      header,
      footer,
      // native form element attributes to pass to the `<form>`
      acceptCharset,
      autoComplete,
      noValidate,
      encType,
      action,
      method,
      target,
      name,
      // any other props get merged into the `<Form>`
      ...other
    },
    ref
  ) => {
    const classPrefix = useFieldClassName();
    const validationSummaryRef = useRef<any | null>();
    const handleEasyFormSubmit = useEasyFormSubmit(onSubmit);
    // local state for error overrides for static validation summary
    const [staticErrors, validationDecorator] = useEasyFormDecorator({
      ref: validationSummaryRef,
      validationSummary,
    });

    const easyFormContentProps = useMemo(
      () => ({
        validationSummary,
        staticErrors,
        submitText,
        structure,
        component,
        children,
        render,
        header,
        footer,
      }),
      [
        validationSummary,
        staticErrors,
        submitText,
        structure,
        component,
        children,
        render,
        header,
        footer,
      ]
    );

    // only actually leave the subscription as undefined if explicitly set to undefined,
    // as this will subscribe to all of the FormState;
    // otherwise use subscription as provided,
    // but default to empty object subscription for performance,
    // and we will spy on the FormState anywhere else we need it
    const subscription =
      'subscription' in other && other.subscription === undefined
        ? undefined
        : other.subscription || DEFAULT_FORM_SUBSCRIPTION;

    return (
      <Form
        {...other}
        // enforce our props
        // by adding them after merging in `other`
        onSubmit={handleEasyFormSubmit}
        decorators={[...decorators, validationDecorator]}
        mutators={{
          ...mutators,
          ...arrayMutators,
          [MUTATOR_SET_FIELD_DATA_KEY]: setFieldData,
        }}
        subscription={subscription}
      >
        {({ handleSubmit, ...otherRenderProps }) => (
          <form
            className={clsx(className, `${classPrefix}__form`)}
            onSubmit={handleSubmit}
            ref={ref}
            // pass all native form element attributes along
            acceptCharset={acceptCharset}
            autoComplete={autoComplete}
            noValidate={noValidate}
            encType={encType}
            action={action}
            method={method}
            target={target}
            name={name}
          >
            {/*
             * pass header and footer to EasyFormContent
             * so that we can memoise the arguments we provide to them
             */}
            <EasyFormContent
              ref={validationSummaryRef}
              hasOnSubmit={typeof onSubmit === 'function'}
              {...otherRenderProps}
              {...easyFormContentProps}
            />
          </form>
        )}
      </Form>
    );
  }
);

// do a deep equal comparison in this case,
// to account for lazy use of `mutators`, `decorators`, `subscription`, etc.
const MemoisedEasyFormForm = memo(EasyFormForm, isEqual);
MemoisedEasyFormForm.displayName = 'EasyFormForm';
export default MemoisedEasyFormForm;
