import React from 'react';
import Button from './Button';
import { ButtonProps } from './Button.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: ButtonProps) => <Button {...props} />;

StandardUsage.args = {
  text: 'Submit',
};

/**
 * A basic Button component that supports a `text` prop
 * to better leverage memoisation,
 * and has a default `type` of `'button'`
 */
export default {
  title: 'Components/Button',
  component: StandardUsage,
};
