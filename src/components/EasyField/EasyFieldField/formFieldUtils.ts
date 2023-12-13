import { FieldSubscription } from 'final-form';

export const FIELD_CONFIG_KEYS = [
  'afterSubmit',
  'allowNull',
  'beforeSubmit',
  'data',
  'defaultValue',
  'format',
  'formatOnBlur',
  'initialValue',
  'isEqual',
  'multiple',
  'parse',
  'subscription',
  'type',
  'validate',
  'validateFields',
  'value',
];

// keep all form values unaltered
// by overriding final-form's default parsing,
// because it converts empty strings to undefined by default
// and removes them from the value result
export const DEFAULT_FIELD_PARSE = (value?: any) => value;

// override final-form's default behaviour
// of validating all other fields,
// as it is an unnecessary performance hit in standard scenarios
export const DEFAULT_FIELD_VALIDATE_FIELDS: string[] = [];

// indicates which meta properties determine showing the field error;
// also extends the field subscription to ensure those meta properties return
export const DEFAULT_ERROR_LOGIC: FieldSubscription = { touched: true };
