import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export type DisclosureProps<C extends ElementType = 'div'> = {
  /**
   * The element to use for the outer element
   * @default 'div'
   */
  component?: C;
  /**
   * If using in uncontrolled mode, sets the starting open state
   */
  defaultOpen?: boolean;
  /**
   * Alias for `defaultOpen`
   * @default false
   */
  initialOpen?: boolean;
  className?: string;
  /**
   * Fires when the button trigger is activated
   */
  onChange?: (
    open: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  children?: ReactNode | ((isOpen: boolean) => ReactNode);
  /**
   * The contents to render inside the button toggle element
   */
  summary?: ReactNode | ((isOpen: boolean) => ReactNode);
  /**
   * Alias for `summary`
   */
  label?: ReactNode | ((isOpen: boolean) => ReactNode);
  /**
   * Alias for `summary`
   */
  title?: ReactNode | ((isOpen: boolean) => ReactNode);
  /**
   * Disable the button interactions
   */
  disabled?: boolean;
  /**
   * Controlled state prop
   */
  open?: boolean;
} & Omit<ComponentPropsWithRef<C>, 'onChange' | 'label' | 'title'>;
