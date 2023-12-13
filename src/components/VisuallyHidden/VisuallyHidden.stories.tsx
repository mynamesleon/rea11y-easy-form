import React from 'react';
import VisuallyHidden from './VisuallyHidden';
import { VisuallyHiddenProps as VisuallyHiddenPropsType } from './VisuallyHidden.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: VisuallyHiddenPropsType) => (
  <VisuallyHidden {...props} />
);

export default {
  title: 'Components/VisuallyHidden',
  component: StandardUsage,
};

const Template = (args: VisuallyHiddenPropsType) => (
  <VisuallyHidden {...args} />
);

export const Focusabled = Template.bind({});
Focusabled.args = {
  focusable: true,
  component: 'button',
  type: 'button',
  onClick: () => {},
  children: 'Skip to content',
};
