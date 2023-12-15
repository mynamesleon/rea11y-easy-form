import type { ComponentPropsWithRef } from 'react';

export type DetailedSelectOption = {
  key?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  /**
   * @todo: consider dropping support for the `selected` property?
   * React will prefer (and probably console warn / error)
   * to use defaultValue on the select
   */
  selected?: boolean;
  children?: SelectOption[];
};

export type SelectOption = string | DetailedSelectOption;
export type SelectOptions = SelectOption[];

export interface SelectOptionsProps {
  options?: SelectOptions;
}

export interface SelectProps extends ComponentPropsWithRef<'select'> {
  options?: SelectOptions;
  className?: string;
}
