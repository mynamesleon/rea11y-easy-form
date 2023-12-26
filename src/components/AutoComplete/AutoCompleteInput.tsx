import React, { memo, useRef, useEffect } from 'react';
import AriaAutocomplete, { type IAriaAutocompleteApi } from 'aria-autocomplete';
import { useUnmountEffect } from '@react-hookz/web';
import type { AutoCompleteInputProps } from './AutoComplete.types';
import Input from '../Input';
import {
  destroyAutoComplete,
  setAutoCompleteInputAttributes,
  setAutoCompleteOptions,
} from './autoCompleteUtils';
import './AutoComplete.less';

const AutoCompleteInput = ({
  name,
  disabled,
  defaultValue,
  ariaAttributes,
  // any other options
  ...props
}: AutoCompleteInputProps) => {
  const autoCompleteRef = useRef<IAriaAutocompleteApi | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoCompleteRef.current) {
      autoCompleteRef.current = AriaAutocomplete(
        inputRef.current as HTMLInputElement,
        props
      );
    } else if (autoCompleteRef.current.options) {
      setAutoCompleteOptions(autoCompleteRef, props);
    }
  });

  useEffect(() => {
    setAutoCompleteInputAttributes(autoCompleteRef, {
      disabled,
      ...ariaAttributes,
    });
  }, [disabled, ariaAttributes]);

  // remember to destroy on unmount
  useUnmountEffect(() => destroyAutoComplete(autoCompleteRef));

  return (
    <Input
      type="hidden"
      name={name}
      ref={inputRef}
      disabled={disabled}
      defaultValue={defaultValue}
      data-testid="AutoCompleteInput"
    />
  );
};

const MemoisedAutoCompleteInput = memo(AutoCompleteInput);
MemoisedAutoCompleteInput.displayName = 'AutoCompleteInput';
export default MemoisedAutoCompleteInput;
