import type { ComponentPropsWithRef } from 'react';

export enum SWITCH_TYPE {
  CHECKBOX = 'checkbox',
  SWITCH = 'switch',
  RADIO = 'radio',
}

export interface BaseSwitchProps extends ComponentPropsWithRef<'input'> {
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
}

export type SwitchStrings = {
  on?: string;
  off?: string;
};

export interface SwitchProps extends BaseSwitchProps {
  type?: SWITCH_TYPE;
  strings?: SwitchStrings;
}
