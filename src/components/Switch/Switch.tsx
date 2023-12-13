import React, { useState, useCallback, useMemo, forwardRef, memo } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import clsx from 'clsx';
import Input from '../Input';
import { SwitchProps, SWITCH_TYPE, SwitchStrings } from './Switch.types';
import { isNullOrUndefined, useFieldClassName } from '../../utils';
import './Switch.less';
import { FIELD_TYPE_OVERRIDE_KEY } from '../../utils/constants';

const DEFAULT_STRINGS: SwitchStrings = {};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      onBlur,
      onFocus,
      onChange,
      checked,
      disabled,
      tabIndex,
      className,
      defaultChecked,
      initialChecked,
      strings = DEFAULT_STRINGS,
      type = SWITCH_TYPE.SWITCH,
      'aria-invalid': invalid,
      ...other
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const classPrefix = useFieldClassName('switch');

    // allow controlled and uncontrolled variant;
    // must use defaultChecked prop to control only initial state
    const [checkedState, setCheckedState] = useState<boolean>(
      Boolean(defaultChecked || initialChecked)
    );
    const actualChecked = isNullOrUndefined(checked)
      ? checkedState
      : Boolean(checked);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isNullOrUndefined(checked)) {
          setCheckedState(event.target.checked);
        }
        onChange?.(event);
      },
      [onChange, checked]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        onBlur?.(event);
      },
      [onBlur]
    );

    // some handling for an invalid type being passed in
    // e.g. convert type 'test' to 'switch' automatically
    const switchType = useMemo(
      () =>
        Object.values(SWITCH_TYPE).includes(type) ? type : SWITCH_TYPE.SWITCH,
      [type]
    );
    const inputType =
      type === SWITCH_TYPE.SWITCH ? SWITCH_TYPE.CHECKBOX : switchType;

    return (
      <span
        className={clsx(
          className,
          classPrefix,
          `${classPrefix}--${switchType}`,
          {
            [`${classPrefix}--checked`]: actualChecked,
            [`${classPrefix}--disabled`]: disabled,
            [`${classPrefix}--invalid`]: invalid,
            [`${classPrefix}--focus`]: focus,
          }
        )}
        data-testid="Switch"
      >
        <Input
          {...other}
          ref={ref}
          type={inputType}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          aria-invalid={invalid}
          disabled={Boolean(disabled)}
          checked={Boolean(actualChecked)}
          className={`${classPrefix}__input`}
          tabIndex={disabled ? -1 : tabIndex}
          role={type === SWITCH_TYPE.SWITCH ? SWITCH_TYPE.SWITCH : undefined}
        />
        {actualChecked && <span className={`${classPrefix}__tick`} />}
        {type === SWITCH_TYPE.SWITCH && (
          <>
            {Boolean(actualChecked && strings?.on) && (
              <span
                className={`${classPrefix}__string ${classPrefix}__string--on`}
                aria-hidden="true"
              >
                {strings.on}
              </span>
            )}
            {Boolean(!actualChecked && strings?.off) && (
              <span
                className={`${classPrefix}__string ${classPrefix}__string--off`}
                aria-hidden="true"
              >
                {strings.off}
              </span>
            )}
          </>
        )}
      </span>
    );
  }
);

// do a deep equal comparison in this case,
// to account for lazy use of the `strings` prop
const MemoisedSwitch = memo(Switch, isEqual);
MemoisedSwitch.displayName = 'Switch';
MemoisedSwitch[FIELD_TYPE_OVERRIDE_KEY] = SWITCH_TYPE.CHECKBOX;
export default MemoisedSwitch;
