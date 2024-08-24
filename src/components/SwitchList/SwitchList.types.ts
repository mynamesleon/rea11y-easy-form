import type { FieldsetProps } from '../Fieldset/Fieldset.types';

export enum SWITCH_LIST_TYPE {
  CHECKBOX = 'checkbox',
  SWITCH = 'switch',
  RADIO = 'radio',
}

export type DetailedSwitchListOption = {
  key?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export type SwitchListOptions = (string | DetailedSwitchListOption)[];

export interface SwitchListProps extends FieldsetProps {
  options?: SwitchListOptions;
  className?: string;
  disabled?: boolean;
  type?: SWITCH_LIST_TYPE;
  name: string;
}

export type useSwitchListOptionsArg = {
  options?: SwitchListOptions;
  name: string;
  type?: SWITCH_LIST_TYPE;
  id?: string;
  classPrefix?: string;
  disabled?: boolean;
};
