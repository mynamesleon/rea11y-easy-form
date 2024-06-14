import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import { isElement as isReactElement } from 'react-is';
import React, { forwardRef, memo, useMemo } from 'react';
import Notice, { NOTICE_TYPE } from '../Notice';
import type {
  ValidationSummaryErrors,
  ValidationSummaryError,
  ValidationSummaryProps,
} from './ValidationSummary.types';
import {
  flattenObject,
  isNullOrUndefined,
  reactKeyFrom,
  useFieldClassName,
} from '../../utils';

const processErrorsArray = (errors?: ValidationSummaryErrors): any[] => {
  if (!errors || typeof errors !== 'object') {
    return [];
  }
  return Object.values(
    flattenObject(errors, {
      flattenArrays: true,
      flattenErrors: false,
      flattenReactNodes: false,
    })
  ).filter((err: ValidationSummaryError) => {
    if (err instanceof Error) {
      return err.message;
    }
    if (typeof err === 'string') {
      return err;
    }
    return !isNullOrUndefined(err);
  });
};

const ValidationSummary = forwardRef<HTMLElement, ValidationSummaryProps>(
  ({ className, error, errors, header, footer, ...other }, ref) => {
    const classPrefix = useFieldClassName('validation-summary');
    const errorsArr = useMemo(() => processErrorsArray(errors), [errors]);

    if (!error && !errorsArr.length) {
      return null;
    }

    return (
      <Notice
        data-testid="ValidationSummary"
        {...other}
        className={clsx(className, classPrefix)}
        type={NOTICE_TYPE.ERROR}
        tabIndex={-1}
        ref={ref}
        as="div"
      >
        {Boolean(header) && (isReactElement(header) ? header : <p>{header}</p>)}
        {Boolean(error) &&
          (isReactElement(error) ? error : <p>{error?.message ?? error}</p>)}
        {Boolean(errorsArr.length) && (
          <ul className={`${classPrefix}__list`}>
            {errorsArr.map((err: ValidationSummaryError, index) => {
              // not attempting to use err.message as key,
              // due to higher risk of duplicate keys
              const key = reactKeyFrom((err as any)?.key, index);
              return (
                <li key={key} className={`${classPrefix}__list-item`}>
                  {err?.message ?? err}
                </li>
              );
            })}
          </ul>
        )}
        {Boolean(footer) && (isReactElement(footer) ? footer : <p>{footer}</p>)}
      </Notice>
    );
  }
);

// use deep equal for memoisation, in case of lazily passing in an errors object
const MemoisedValidationSummary = memo(ValidationSummary, isEqual);
MemoisedValidationSummary.displayName = 'ValidationSummary';
export default MemoisedValidationSummary;
