import clsx from 'clsx';
import React, { useMemo } from 'react';
import { fieldSubscriptionItems } from 'final-form';
import { useDeepCompareMemo } from '@react-hookz/web';
import ErrorMessage from '../../ErrorMessage';
import { useEasyFormContext } from '../../EasyForm/EasyFormContext';
import type { EasyFieldFieldProps } from './EasyFieldField.types';
import {
  useAutoId,
  renderComponent,
  useMutatedField,
  useFieldClassName,
  extractKeysForSubscription,
} from '../../../utils';
import {
  FIELD_CONFIG_KEYS,
  DEFAULT_ERROR_LOGIC,
  DEFAULT_FIELD_PARSE,
  DEFAULT_FIELD_VALIDATE_FIELDS,
} from './formFieldUtils';

const EasyFieldField = ({
  useFieldHook = useMutatedField,
  errorLogic: errorLogicProp,
  component,
  className,
  validate,
  children,
  render,
  name,
  ...other
}: EasyFieldFieldProps) => {
  const errorId = useAutoId('easy-field-field__error');
  const classPrefix = useFieldClassName('easy-field-field');
  const { defaultFieldErrorLogic } = useEasyFormContext();
  const errorLogic =
    errorLogicProp || defaultFieldErrorLogic || DEFAULT_ERROR_LOGIC;
  const definedSubscription = useDeepCompareMemo(
    () => ({
      ...extractKeysForSubscription(other.subscription),
      ...extractKeysForSubscription(errorLogic, (key: string) => key),
      // there are some parts of the FieldState
      // that we always want to subscribe to...
      validating: true,
      length: true,
      value: true,
      error: true,
      data: true,
    }),
    [other.subscription, errorLogic]
  );

  // allow parse, validateFields, and subscription
  // to be explicitly set to `undefined`,
  // to still allow default parse handling and
  // to still allow the default subscribe/validation behaviour
  const parse = 'parse' in other ? other.parse : DEFAULT_FIELD_PARSE;
  const validateFields =
    'validateFields' in other
      ? other.validateFields
      : DEFAULT_FIELD_VALIDATE_FIELDS;
  const subscription =
    'subscription' in other && other.subscription === undefined
      ? undefined
      : definedSubscription;

  // react-final-form destructures the config object internally,
  // so we do not need to memoise it
  const { input, meta } = useFieldHook(name, {
    ...other,
    validateFields,
    subscription,
    validate,
    parse,
  });

  // check against the defined errorLogic to see if the error message should show
  const shouldShowError = useDeepCompareMemo(() => {
    for (const entry in errorLogic) {
      if (
        errorLogic.hasOwnProperty(entry) &&
        Boolean(errorLogic[entry]) !== Boolean(meta[entry])
      ) {
        return false;
      }
    }
    return true;
  }, [meta, errorLogic]);

  // get all non-useField config props, to be passed along to `children` / `render`
  const limitedOther = useMemo(
    () =>
      FIELD_CONFIG_KEYS.reduce(
        (acc, key) => {
          if (key in acc) {
            delete acc[key];
          }
          return acc;
        },
        // make a shallow copy of `other` first to avoid mutations
        { ...other }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(other)]
  );

  const error = shouldShowError && meta.error;
  const renderProps = useMemo(() => {
    const result = {
      ...limitedOther,
      component,
      children,
      render,
      input,
      meta,
    };
    if (error) {
      // including the errorId in aria-describedby
      // due to the minimal support for aria-errormessage
      // with NVDA, TalkBack, VoiceOver, and Narrator
      // (re-purposing clsx to handle the string merging)
      result['aria-describedby'] = clsx(
        result['aria-describedby'],
        errorId
      ).trim();
      result['aria-invalid'] = true;
    }
    return result;
  }, [limitedOther, errorId, error, component, children, render, input, meta]);

  // @todo: setting classes based on meta state could cause a lot of DOM updates
  // e.g. from the `validating` state on each keypress;
  // if `validateFields` is also used, then this could 
  // cause a lot of extra DOM updates on the page.
  // So we should test the impact of this, and maybe put this behind a prop
  const metaClassNames = useDeepCompareMemo(
    () =>
      fieldSubscriptionItems.reduce((acc, key) => {
        acc[`${classPrefix}--${key}`] = meta[key];
        return acc;
      }, {}),
    [meta, classPrefix]
  );

  return (
    <>
      {Boolean(error) && (
        <ErrorMessage
          text={error?.message ?? error}
          loading={meta.validating}
          id={errorId}
        />
      )}
      <div
        data-testid="EasyFieldField"
        className={clsx(className, classPrefix, metaClassNames)}
      >
        {renderComponent(renderProps)}
      </div>
    </>
  );
};

EasyFieldField.displayName = 'EasyFieldField';
export default EasyFieldField;
