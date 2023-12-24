import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import { useDeepCompareMemo, usePrevious } from '@react-hookz/web';
import React, { forwardRef, memo, useRef, useCallback } from 'react';
import type { AutoCompleteProps } from './AutoComplete.types';
import AutoCompleteInput from './AutoCompleteInput';
import { useFieldClassName } from '../../utils';
import './AutoComplete.less';

const AutoComplete = forwardRef<HTMLDivElement, AutoCompleteProps>(
  (
    {
      key,
      value,
      onChange,
      className,
      defaultValue,
      multipleSeparator = ',',
      // core options that need to trigger re-init
      options: optionsProp,
      source: sourceProp,
      wrapperClassName,
      deleteAllControl,
      showAllControl,
      inputClassName,
      listClassName,
      cssNameSpace,
      placeholder,
      autoGrow,
      multiple,
      name,
      id,
      // any other options
      ...otherOptions
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('autocomplete');

    const initialValue = useDeepCompareMemo(() => {
      const val = value ?? defaultValue;
      if (Array.isArray(val)) {
        return val.join(multipleSeparator);
      }
      return val || '';
    }, [value, defaultValue, multipleSeparator]);

    const handleChange = useCallback(
      (selected: any[]) => {
        if (typeof onChange === 'function') {
          const values = (selected || []).map(({ value }) => value);
          onChange?.(values);
        }
      },
      [onChange]
    );

    const source = sourceProp || optionsProp;
    const coreOptions = {
      wrapperClassName,
      deleteAllControl,
      showAllControl,
      inputClassName,
      listClassName,
      cssNameSpace,
      placeholder,
      autoGrow,
      multiple,
      source,
      name,
      id,
    };
    const keyRef = useRef<number>(0);
    const initialValueRef = useRef<string>();
    const coreOptionsRef = useRef(coreOptions);
    const previousCoreOptions = usePrevious(coreOptions);
    if (!isEqual(coreOptions, previousCoreOptions)) {
      initialValueRef.current = initialValue;
      coreOptionsRef.current = coreOptions;
      keyRef.current += 1;
    }

    // update aria attributes to reflect
    const ariaProps = Object.entries(otherOptions).filter(([key]) =>
      key.startsWith('aria-')
    );
    const memoisedAriaProps = useDeepCompareMemo(
      () =>
        ariaProps.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      [ariaProps]
    );

    return (
      <div
        className={clsx(className, classPrefix)}
        data-testid="AutoComplete"
        ref={ref}
      >
        <AutoCompleteInput
          key={`${classPrefix}-key-${keyRef.current}`}
          defaultValue={initialValueRef.current}
          multipleSeparator={multipleSeparator}
          ariaAttributes={memoisedAriaProps}
          onChange={handleChange}
          {...otherOptions}
          {...coreOptionsRef.current}
        />
      </div>
    );
  }
);

const MemoisedAutoComplete = memo(AutoComplete);
MemoisedAutoComplete.displayName = 'AutoComplete';
export default MemoisedAutoComplete;
