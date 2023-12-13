import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
} from 'react';

export enum SWITCH_TYPE {
  CHECKBOX = 'checkbox',
  SWITCH = 'switch',
  RADIO = 'radio',
}

export interface BaseSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  tabIndex?: number;
  disabled?: boolean;
  className?: string;
  classPrefix?: string;
  checked?: boolean;
  /**
   * Used in uncontrolled mode to set the starting checked state
   */
  defaultChecked?: boolean;
  /**
   * Alias for defaultChecked
   */
  initialChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export type SwitchStrings = {
  on?: string;
  off?: string;
};

export interface SwitchProps extends BaseSwitchProps {
  type?: SWITCH_TYPE;
  strings?: SwitchStrings;
}
