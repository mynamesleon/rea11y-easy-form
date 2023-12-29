import { lazy } from 'react';
import type { FieldValidator } from 'final-form';
import { EDITABLE_NATIVE_INPUT_TYPES } from '../../utils/constants';
import Disclosure from '../Disclosure';
import Fieldset from '../Fieldset';
import AsHtml from '../AsHtml';
import CONTROL_TYPE from '../../controlTypes';
// import Switch normally to allow for field type override
import Switch from '../Switch';
import {
  isAlpha,
  isAlphaNumeric,
  isEmail,
  isDate,
  isEmpty,
  isHexColor,
  isInteger,
  isLowerCase,
  isNumber,
  isUpperCase,
  isUrl,
} from '../../utils';

/**
 * container types can have children that register other Fields,
 * so we must import them normally, and not dynamically,
 * so that they (and their validation) are properly registered
 * before any other actions (such as submissions) are attempted
 *
 * @note: we will not include aliases for built-in container types,
 * as these cannot be overridden
 */
export const DEFAULT_CONTAINERS = {
  [CONTROL_TYPE.HTML]: AsHtml,
  [CONTROL_TYPE.DISCLOSURE]: Disclosure,
  [CONTROL_TYPE.FIELDSET]: Fieldset,
  [CONTROL_TYPE.CONTAINER]: ({ children }) => children,
};

const Input = lazy(() => import('../Input'));
const RadioList = lazy(() => import('../RadioList'));
const SwitchList = lazy(() => import('../SwitchList'));
const CheckboxList = lazy(() => import('../CheckboxList'));
const AutoComplete = lazy(() => import('../AutoComplete'));
export const DEFAULT_COMPONENTS = {
  // use generic Input component for any standard input types
  // that do not have custom handling
  ...EDITABLE_NATIVE_INPUT_TYPES.reduce((acc, type) => {
    acc[type] = Input;
    return acc;
  }, {}),
  // other standard form controls
  [CONTROL_TYPE.RADIO]: lazy(() => import('../Radio')),
  [CONTROL_TYPE.SELECT]: lazy(() => import('../Select')),
  [CONTROL_TYPE.TEXTAREA]: lazy(() => import('../Textarea')),
  [CONTROL_TYPE.CHECKBOX]: lazy(() => import('../Checkbox')),
  // custom controls
  [CONTROL_TYPE.SWITCH]: Switch,
  [CONTROL_TYPE.COLOR]: lazy(() => import('../ColorInput')),
  // checkbox list
  [CONTROL_TYPE.CHECKBOXES]: CheckboxList,
  [CONTROL_TYPE.CHECKBOXLIST]: CheckboxList,
  [CONTROL_TYPE.CHECKBOX_LIST]: CheckboxList,
  // radio list
  [CONTROL_TYPE.RADIOS]: RadioList,
  [CONTROL_TYPE.RADIOLIST]: RadioList,
  [CONTROL_TYPE.RADIO_LIST]: RadioList,
  // switch list
  [CONTROL_TYPE.SWITCHES]: SwitchList,
  [CONTROL_TYPE.SWITCHLIST]: SwitchList,
  [CONTROL_TYPE.SWITCH_LIST]: SwitchList,
  // autocomplete
  [CONTROL_TYPE.AUTOCOMPLETE]: AutoComplete,
  [CONTROL_TYPE.AUTO_COMPLETE]: AutoComplete,
  [CONTROL_TYPE.TYPEAHEAD]: AutoComplete,
  [CONTROL_TYPE.TYPE_AHEAD]: AutoComplete,
  [CONTROL_TYPE.COMBOBOX]: AutoComplete,
  [CONTROL_TYPE.COMBO_BOX]: AutoComplete,
};

const invertForValidation =
  (validator: FieldValidator<any>): FieldValidator<any> =>
  (...args) =>
    !validator(...args);

export const DEFAULT_FIELD_VALIDATION_FUNCTIONS = {
  alpha: invertForValidation(isAlpha),
  alphanumeric: invertForValidation(isAlphaNumeric),
  date: invertForValidation(isDate),
  email: invertForValidation(isEmail),
  empty: invertForValidation(isEmpty),
  hexcolor: invertForValidation(isHexColor),
  integer: invertForValidation(isInteger),
  lowercase: invertForValidation(isLowerCase),
  number: invertForValidation(isNumber),
  uppercase: invertForValidation(isUpperCase),
  url: invertForValidation(isUrl),
  required: isEmpty,
};
