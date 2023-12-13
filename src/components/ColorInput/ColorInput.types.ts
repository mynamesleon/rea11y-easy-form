import type { ChangeEvent, FocusEvent, AriaAttributes } from 'react';
import type { Dictionary } from '../../utils/constants';

// extending Dictionary, instead of InputHTMLAttributes,
// due to incompatible `onChange` approach
export interface ColorInputProps extends AriaAttributes, Dictionary<any> {
  colorPickerLabel?: string;
  /**
   * Class name to add to the container element
   */
  className?: string;
  value?: string;
  /**
   * Used in uncontrolled mode to set the starting input value
   */
  defaultValue?: string;
  /**
   * Alias for defaultValue
   */
  initialValue?: string;
  onChange?: (
    value?: string,
    event?: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLDivElement>
  ) => void;
  /**
   * Whether to keep invalid color values when exiting the field
   */
  keepInvalidValues?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
}
