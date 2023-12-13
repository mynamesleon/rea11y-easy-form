import React from 'react';
import ColorInput from './ColorInput';
import { ColorInputProps } from './ColorInput.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: ColorInputProps) => (
  <ColorInput {...props} />
);

/**
 * A basic enhancement on the native color input type,
 * this component provides a normal text input alongside a color input,
 * allowing native color picker selections, and the ability to
 * manually type a hex or keyword color into the text input.
 *
 * The text input supports 3 and 6 character hex values (with and without the #)
 * as well as css color keywords such as blue, hotpink, etc.
 *
 * By default, any value that cannot be interpreted as a valid hex code
 * will be cleared from the input.
 * This is to simplify use of the component without validation rules,
 * but can be overridden with the `keepInvalidValues` prop.
 */
export default {
  title: 'Components/ColorInput',
  component: StandardUsage,
};
