import type { AriaAttributes, Attributes } from 'react';
import type { IAriaAutocompleteOptions } from 'aria-autocomplete';

// copy most autocomplete options to help them
// show up in the storybook controls
type AutoCompleteOptionsCopy = {
  id?: IAriaAutocompleteOptions['id'];
  name?: IAriaAutocompleteOptions['name'];
  source?: IAriaAutocompleteOptions['source'];
  sourceMapping?: IAriaAutocompleteOptions['sourceMapping'];
  alsoSearchIn?: IAriaAutocompleteOptions['alsoSearchIn'];
  create?: IAriaAutocompleteOptions['create'];
  delay?: IAriaAutocompleteOptions['delay'];
  minLength?: IAriaAutocompleteOptions['minLength'];
  maxResults?: IAriaAutocompleteOptions['maxResults'];
  showAllControl?: IAriaAutocompleteOptions['showAllControl'];
  confirmOnBlur?: IAriaAutocompleteOptions['confirmOnBlur'];
  multiple?: IAriaAutocompleteOptions['multiple'];
  autoGrow?: IAriaAutocompleteOptions['autoGrow'];
  maxItems?: IAriaAutocompleteOptions['maxItems'];
  multipleSeparator?: IAriaAutocompleteOptions['multipleSeparator'];
  deleteOnBackspace?: IAriaAutocompleteOptions['deleteOnBackspace'];
  deleteAllControl?: IAriaAutocompleteOptions['deleteAllControl'];
  deleteAllText?: IAriaAutocompleteOptions['deleteAllText'];
  asyncQueryParam?: IAriaAutocompleteOptions['asyncQueryParam'];
  asyncMaxResultsParam?: IAriaAutocompleteOptions['asyncMaxResultsParam'];
  placeholder?: IAriaAutocompleteOptions['placeholder'];
  noResultsText?: IAriaAutocompleteOptions['noResultsText'];
  cssNameSpace?: IAriaAutocompleteOptions['cssNameSpace'];
  listClassName?: IAriaAutocompleteOptions['listClassName'];
  inputClassName?: IAriaAutocompleteOptions['inputClassName'];
  wrapperClassName?: IAriaAutocompleteOptions['wrapperClassName'];
  srDelay?: IAriaAutocompleteOptions['srDelay'];
  srAutoClear?: IAriaAutocompleteOptions['srAutoClear'];
  srDeleteText?: IAriaAutocompleteOptions['srDeleteText'];
  srDeletedText?: IAriaAutocompleteOptions['srDeletedText'];
  srShowAllText?: IAriaAutocompleteOptions['srShowAllText'];
  srSelectedText?: IAriaAutocompleteOptions['srSelectedText'];
  srListLabelText?: IAriaAutocompleteOptions['srListLabelText'];
  srAssistiveText?: IAriaAutocompleteOptions['srAssistiveText'];
  srAssistiveTextAutoClear?: IAriaAutocompleteOptions['srAssistiveTextAutoClear'];
} & IAriaAutocompleteOptions;

export type AutoCompleteInputProps = {
  ariaAttributes?: AriaAttributes;
  defaultValue?: string;
  disabled?: boolean;
} & AutoCompleteOptionsCopy;

export type AutoCompleteProps = {
  className?: string;
  disabled?: boolean;
  value?: string | string[];
  onChange?: (selected: string[]) => void;
  /**
   * alias for `source`
   */
  options?: IAriaAutocompleteOptions['source'];
} & Omit<AutoCompleteOptionsCopy, 'onChange'> &
  Attributes;
