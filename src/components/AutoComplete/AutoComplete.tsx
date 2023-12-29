import clsx from 'clsx';
import { isEqual } from '@react-hookz/deep-equal';
import { useDeepCompareMemo, usePrevious } from '@react-hookz/web';
import React, { forwardRef, memo, useRef, useCallback, useState } from 'react';
import type { AutoCompleteProps } from './AutoComplete.types';
import AutoCompleteInput from './AutoCompleteInput';
import { useFieldClassName } from '../../utils';
import './AutoComplete.less';

const useParsedAutoCompleteValue = (
  value?: AutoCompleteProps['value'],
  multipleSeparator?: AutoCompleteProps['multipleSeparator']
) =>
  useDeepCompareMemo(() => {
    if (Array.isArray(value)) {
      return value.join(multipleSeparator);
    }
    return value || '';
  }, [value, multipleSeparator]);

const AutoComplete = forwardRef<HTMLDivElement, AutoCompleteProps>(
  (
    {
      key,
      value,
      onChange,
      className,
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
    const [localValue, setLocalValue] = useState(value);

    const parsedValue = useParsedAutoCompleteValue(value, multipleSeparator);
    const parsedLocalValue = useParsedAutoCompleteValue(
      localValue,
      multipleSeparator
    );

    const handleChange = useCallback(
      (selected: any[]) => {
        const values = (selected || []).map(({ value }) => value);
        setLocalValue(values);
        onChange?.(values);
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
    const defaultValueRef = useRef<string>();
    const coreOptionsRef = useRef(coreOptions);
    const previousCoreOptions = usePrevious(coreOptions);
    if (
      parsedValue !== parsedLocalValue ||
      !isEqual(coreOptions, previousCoreOptions)
    ) {
      defaultValueRef.current = parsedValue;
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
          defaultValue={defaultValueRef.current}
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
