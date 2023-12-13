import React from 'react';
import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: CheckboxProps) => <Checkbox {...props} />;

/**
 * A basic wrapper around the `<Switch />` component, with a default `type`.
 */
export default {
  title: 'Components/Checkbox',
  component: StandardUsage,
};
