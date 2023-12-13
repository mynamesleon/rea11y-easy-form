import clsx from 'clsx';
import React, {
  useCallback,
  useMemo,
  useState,
  memo,
  forwardRef,
  useRef,
} from 'react';
import type {
  MouseEventHandler,
  ChangeEvent,
  FocusEvent,
  FocusEventHandler,
} from 'react';
import {
  mergeRefs,
  useAutoId,
  isNullOrUndefined,
  useFieldClassName,
  focusAndSmoothlyScrollIntoView,
} from '../../utils';
import type { ColorInputProps } from './ColorInput.types';
import { COLOR_KEYWORDS_KEYS, convertToColorHex } from './colorInputUtils';
import './ColorInput.less';

const COLOR_HEX_BLACK = '#000000';
const MAX_INPUT_LENGTH = Math.max(
  COLOR_HEX_BLACK.length, // include full color hex length just in case
  ...COLOR_KEYWORDS_KEYS.map(({ length }) => length)
);

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      colorPickerLabel = 'Pick a color',
      'aria-invalid': ariaInvalid,
      keepInvalidValues = false,
      defaultValue,
      initialValue,
      className,
      // handle these explicitly, as we want them on the main input
      value,
      onChange,
      id,
      name,
      disabled,
      // all other props will be applied to both inputs
      ...other
    },
    ref
  ) => {
    // allow controlled and uncontrolled variant
    const [valueState, setValueState] = useState(
      convertToColorHex(defaultValue || initialValue)
    );
    // in controlled mode,
    const actualValue = isNullOrUndefined(value) ? valueState : value;
    const classPrefix = useFieldClassName('color-input');
    const colorId = useAutoId('color-input');

    // if the current actual value cannot be converted to a full hex,
    // then we need to set the input[type='color'] value to a valid one
    // otherwise it will output lots of warnings in the console
    const colorInputValue = useMemo<string>(
      () => convertToColorHex(actualValue) || COLOR_HEX_BLACK,
      [actualValue]
    );

    const handleValueChange = useCallback(
      (
        newValue: string = '',
        event?: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLDivElement>
      ) => {
        if (isNullOrUndefined(value)) {
          setValueState(newValue);
        }
        onChange?.(newValue, event);
      },
      [onChange, value]
    );
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        handleValueChange(event.target.value, event),
      [handleValueChange]
    );

    // when clicking specifically on the outer div,
    // move focus to the text input
    const localDivRef = useRef<HTMLDivElement>(null);
    const localInputRef = useRef<HTMLInputElement>(null);
    const handleOuterClick = useCallback<MouseEventHandler<HTMLDivElement>>(
      (event) => {
        if (event.target === localDivRef.current) {
          focusAndSmoothlyScrollIntoView(localInputRef, true);
        }
      },
      []
    );
    // when blurring off of the field, set the value to a valid hex if possible,
    // otherwise, clear the value (if that is enabled)
    const handleOuterBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
      (event) => {
        const loweredValue = actualValue?.toLowerCase() ?? '';
        const convertedValue = convertToColorHex(loweredValue);
        // do nothing if it was already a valid full hex color
        if (convertedValue.toLowerCase() === loweredValue) {
          return;
        }
        // if a new value was returned from the conversion, set it
        if (convertedValue) {
          handleValueChange(convertedValue, event);
          return;
        }

        // if keepInvalidValues is falsy, and the conversion returned nothing,
        // clear the value entirely
        if (!keepInvalidValues) {
          handleValueChange('', event);
        }
      },
      [actualValue, handleValueChange, keepInvalidValues]
    );

    const sharedProps = {
      'aria-invalid': ariaInvalid,
      onChange: handleChange,
      disabled,
    };

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        onBlur={handleOuterBlur}
        className={clsx(className, classPrefix)}
        onClick={handleOuterClick}
        ref={localDivRef}
        data-testid="ColorInput"
        aria-disabled={disabled}
        aria-invalid={ariaInvalid}
      >
        {/* use regular inputs instead of <Input>,
        and we will style the outer container instead */}
        <input
          {...other}
          {...sharedProps}
          maxLength={MAX_INPUT_LENGTH}
          type="text"
          value={actualValue}
          id={id}
          name={name}
          aria-owns={colorId}
          className={`${classPrefix}__text`}
          ref={mergeRefs([localInputRef, ref])}
          data-testid="ColorInput__text"
        />
        <input
          aria-label={colorPickerLabel}
          {...other}
          {...sharedProps}
          type="color"
          id={colorId}
          value={colorInputValue}
          className={`${classPrefix}__color`}
          data-testid="ColorInput__color"
        />
      </div>
    );
  }
);

const MemoisedColorInput = memo(ColorInput);
MemoisedColorInput.displayName = 'ColorInput';
export default MemoisedColorInput;
