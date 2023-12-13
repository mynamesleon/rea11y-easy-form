import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorInput from './ColorInput';
import { ColorInputProps } from './ColorInput.types';
import { COLOR_KEYWORDS_KEYS, convertToColorHex } from './colorInputUtils';

jest.mock('./colorInputUtils', () => ({
  ...jest.requireActual('./colorInputUtils'),
  convertToColorHex: jest.fn((arg) => arg),
}));

describe('<ColorInput />', () => {
  let props: ColorInputProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = {};
  });

  const renderComponent = () => render(<ColorInput {...props} />);

  it('takes a className prop', () => {
    props.className = 'className';
    const { getByTestId } = renderComponent();
    const component = getByTestId('ColorInput');
    expect(component).toHaveClass(props.className);
  });

  it('passes other props onto both inputs', () => {
    props.hidden = true;
    props['data-something'] = 'something';
    const { getByTestId } = renderComponent();
    const textInput = getByTestId('ColorInput__text');
    expect(textInput).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(textInput).toHaveAttribute('hidden');
    const colorInput = getByTestId('ColorInput__color');
    expect(colorInput).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(colorInput).toHaveAttribute('hidden');
  });

  it('sets `disabled` on both inputs, and `aria-disabled` on the container', () => {
    props.disabled = true;
    const { getByTestId } = renderComponent();
    expect(getByTestId('ColorInput')).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('ColorInput__text')).toBeDisabled();
    expect(getByTestId('ColorInput__color')).toBeDisabled();
  });

  it('sets the `aria-invalid` prop on both inputs and the container', () => {
    props['aria-invalid'] = true;
    const { getByTestId } = renderComponent();
    expect(getByTestId('ColorInput')).toHaveAttribute('aria-invalid', 'true');
    expect(getByTestId('ColorInput__text')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(getByTestId('ColorInput__color')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  describe('text input', () => {
    it('has a max length based on the longest color keyword', () => {
      const maxLength = Math.max(
        ...COLOR_KEYWORDS_KEYS.map(({ length }) => length)
      );
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      expect(textInput).toHaveAttribute('maxlength', String(maxLength));
    });

    it('has an aria-owns attribute that points to the color input', () => {
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const colorInput = getByTestId('ColorInput__color');
      expect(textInput).toHaveAttribute(
        'aria-owns',
        colorInput.getAttribute('id')
      );
    });
  });

  describe('color input', () => {
    it('has a default aria-label', () => {
      const { getByTestId } = renderComponent();
      const colorInput = getByTestId('ColorInput__color');
      expect(colorInput).toHaveAttribute('aria-label', expect.any(String));
    });

    it('takes the colorPickerLabel prop as an aria-label', () => {
      props.colorPickerLabel = 'Color picker label';
      const { getByTestId } = renderComponent();
      const colorInput = getByTestId('ColorInput__color');
      expect(colorInput).toHaveAttribute('aria-label', props.colorPickerLabel);
    });
  });

  describe('uncontrolled mode', () => {
    it('works in uncontrolled mode', () => {
      const newValue = '#123456';
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      expect(textInput).not.toHaveValue(newValue);
      fireEvent.change(textInput, {
        target: {
          value: newValue,
        },
      });
      expect(textInput).toHaveValue(newValue);
    });

    it('takes a defaultValue which it sets on both inputs', () => {
      props.defaultValue = `#123456`;
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const colorInput = getByTestId('ColorInput__color');
      expect(textInput).toHaveValue(props.defaultValue);
      expect(colorInput).toHaveValue(props.defaultValue);
    });

    it('takes an initialValue as an alias for defaultValue', () => {
      props.initialValue = `#123456`;
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const colorInput = getByTestId('ColorInput__color');
      expect(textInput).toHaveValue(props.initialValue);
      expect(colorInput).toHaveValue(props.initialValue);
    });

    it('converts the defaultValue using the convertToColorHex util', () => {
      props.defaultValue = `#112233`;
      renderComponent();
      expect(convertToColorHex).toHaveBeenCalledWith(props.defaultValue);
    });
  });

  describe('controlled mode', () => {
    it('specifically uses the provided value prop', () => {
      props.value = '#654321';
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      // check start value
      expect(textInput).toHaveValue(props.value);
      // check that value from onChange is ignored
      const changeValue = '#123456';
      fireEvent.change(textInput, {
        target: {
          value: changeValue,
        },
      });
      expect(textInput).toHaveValue(props.value);
    });
  });

  it('fires an onChange prop when the value changes, with the new value, and an event object', () => {
    props.onChange = jest.fn();
    const { getByTestId } = renderComponent();
    const textInput = getByTestId('ColorInput__text');
    const changeValue = '#123456';
    fireEvent.change(textInput, {
      target: {
        value: changeValue,
      },
    });
    expect(props.onChange).toHaveBeenCalledWith(
      changeValue,
      expect.any(Object)
    );
  });

  it('moves focus to the text input when the container area is clicked', () => {
    const { getByTestId } = renderComponent();
    const target = getByTestId('ColorInput');
    fireEvent.click(target);
    expect(getByTestId('ColorInput__text')).toHaveFocus();
  });

  describe('when blurring from the field', () => {
    it('removes invalid values by default if converting it to a color hex returns nothing', () => {
      (convertToColorHex as any).mockReturnValue('');
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const changeValue = 'invalid_value';
      fireEvent.change(textInput, {
        target: {
          value: changeValue,
        },
      });
      fireEvent.blur(textInput);
      expect(textInput).toHaveValue('');
    });

    it('does not remove invalid values if `keepInvalidValues` is true', () => {
      props.keepInvalidValues = true;
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const changeValue = 'invalid_value';
      fireEvent.change(textInput, {
        target: {
          value: changeValue,
        },
      });
      fireEvent.blur(textInput);
      expect(textInput).toHaveValue(changeValue);
    });

    it('attempts to convert the current value to a valid hex, and replaces the current value if one is returned', () => {
      const convertedHex = '#FFC0CB';
      (convertToColorHex as any).mockReturnValue(convertedHex);
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const changeValue = 'pink';
      fireEvent.change(textInput, {
        target: {
          value: changeValue,
        },
      });
      fireEvent.blur(textInput);
      expect(convertToColorHex).toHaveBeenCalledWith(changeValue);
      expect(textInput).toHaveValue(convertedHex);
    });

    it('triggers an `onChange` if `convertToColorHex` returns a different value than the current value', () => {
      const convertedHex = '#123456';
      (convertToColorHex as any).mockReturnValue(convertedHex);
      props.onChange = jest.fn();
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const changeValue = 'invalid_value';
      fireEvent.change(textInput, {
        target: {
          value: changeValue,
        },
      });
      fireEvent.blur(textInput);
      expect(props.onChange).toHaveBeenCalledWith(
        convertedHex,
        expect.any(Object)
      );
    });

    it('does not trigger `onChange` if the converted value is equivalent to the current value', () => {
      const convertedHex = '#ff00aa';
      (convertToColorHex as any).mockReturnValue(convertedHex);
      props.onChange = jest.fn();
      const { getByTestId } = renderComponent();
      const textInput = getByTestId('ColorInput__text');
      const changeValue = '#FF00AA'; // check different casing
      fireEvent.change(textInput, {
        target: {
          value: changeValue,
        },
      });
      (props.onChange as any).mockClear(); // clear the onChange before blurring
      fireEvent.blur(textInput);
      expect(props.onChange).not.toHaveBeenCalled();
    });
  });
});
