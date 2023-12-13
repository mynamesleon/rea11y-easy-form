import React from 'react';
import Input from './Input';
import { InputProps } from './Input.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: InputProps) => <Input {...props} />;

/**
 * A basic Input component
 */
export default {
  title: 'Components/Input',
  component: StandardUsage,
};
