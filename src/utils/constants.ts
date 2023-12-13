export const CLASS_PREFIX = 'easy-form';

export const FIELD_TYPE_OVERRIDE_KEY = '_easy_form_field_type_override';

export const MUTATOR_SET_FIELD_DATA_KEY = '_easy_form_field_mutator_set_data';
export const FIELD_DATA_LABEL_KEY = '_easy_form_field_label';

export const EDITABLE_NATIVE_INPUT_TYPES = [
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

export interface Dictionary<T = any> {
  [x: string]: T;
}
