import clsx from 'clsx';
import type { MutableRefObject } from 'react';
import type {
  IAriaAutocompleteApi,
  IAriaAutocompleteOptions,
} from 'aria-autocomplete';
import { ARIA_ATTRIBUTES, isNullOrUndefined } from '../../utils';

type AutoCompleteApiRef = MutableRefObject<IAriaAutocompleteApi | any | null>;

export const destroyAutoComplete = (autoCompleteRef: AutoCompleteApiRef) =>
  autoCompleteRef.current?.destroy?.();

export const disableAutoComplete = (
  autoCompleteRef: AutoCompleteApiRef,
  disableDeletions?: boolean
) => autoCompleteRef.current?.disable?.(disableDeletions);

export const enableAutoComplete = (autoCompleteRef: AutoCompleteApiRef) =>
  autoCompleteRef.current?.enable?.();

export const setAutoCompleteOption = <K extends keyof IAriaAutocompleteOptions>(
  autoCompleteRef: AutoCompleteApiRef,
  option?: K,
  value?: IAriaAutocompleteOptions[K]
) => autoCompleteRef.current?.setOption?.(option, value);

export const setAutoCompleteOptions = (
  autoCompleteRef: AutoCompleteApiRef,
  options: IAriaAutocompleteOptions
) => {
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      setAutoCompleteOption(
        autoCompleteRef,
        key as keyof IAriaAutocompleteOptions,
        options[key]
      );
    }
  }
};

export const setAutoCompleteInputAttributes = (
  autoCompleteRef: AutoCompleteApiRef,
  { disabled, ...aria }
) => {
  const autocomplete = autoCompleteRef.current;
  const input = autocomplete?.wrapper?.querySelector('input');
  if (!input) {
    return;
  }

  ARIA_ATTRIBUTES.forEach((attribute) => {
    if (isNullOrUndefined(aria[attribute])) {
      input.removeAttribute(attribute);
      return;
    }
    input.setAttribute(
      attribute,
      // use clsx to merge the strings for us
      clsx(input.getAttribute(attribute), String(aria[attribute]))
    );
  });

  // force disable based on disabled prop
  if (disabled) {
    disableAutoComplete(autoCompleteRef, true);
    return;
  } else {
    enableAutoComplete(autoCompleteRef);
  }

  // ensure autocomplete remains soft disabled if selection limit is reached
  const { selected, options } = autocomplete as IAriaAutocompleteApi;
  if (selected?.length >= (options?.maxItems || Infinity)) {
    disableAutoComplete(autoCompleteRef, false);
  }
};
