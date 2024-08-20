import React, { memo, useRef, useEffect } from 'react';
import type { IAriaAutocompleteApi } from 'aria-autocomplete';
import { useUnmountEffect } from '@react-hookz/web';
import type { AutoCompleteInputProps } from './AutoComplete.types';
import Skeleton, { SKELETON_TYPE } from '../Skeleton';
import Input from '../Input';
import {
  destroyAutoComplete,
  setAutoCompleteInputAttributes,
  setAutoCompleteOptions,
} from './autoCompleteUtils';
import { useAsyncOnMount } from '../../utils';
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

  const { result } = useAsyncOnMount(() => import('aria-autocomplete'));
  const AriaAutocomplete = result?.default;

  useEffect(() => {
    if (!AriaAutocomplete) {
      return;
    }
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
  }, [disabled, ariaAttributes, AriaAutocomplete]);

  // remember to destroy on unmount
  useUnmountEffect(() => destroyAutoComplete(autoCompleteRef));

  if (!AriaAutocomplete) {
    return <Skeleton type={SKELETON_TYPE.INPUT} />;
  }

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
