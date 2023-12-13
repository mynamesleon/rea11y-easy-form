import React from 'react';
import Label from './Label';
import Input from '../Input';
import { LabelProps as LabelPropsType } from './Label.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: LabelPropsType) => <Label {...props} />;

StandardUsage.args = {
  text: 'Label text',
};

export default {
  title: 'Components/Label',
  component: StandardUsage,
};

export const WithChildren = (args: LabelPropsType) => (
  <Label {...args}>
    <span>Label text</span>
    <Input aria-required={args.required} />
  </Label>
);

export const Required = (args: LabelPropsType) => (
  <>
    <Label {...args} />
    <Input id="input" aria-required={args.required} />
  </>
);
Required.args = {
  text: 'Label text',
  required: true,
  srRequiredText: 'Required',
  htmlFor: 'input',
};
