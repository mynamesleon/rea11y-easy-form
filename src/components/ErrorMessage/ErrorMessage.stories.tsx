import React from 'react';
import ErrorMessage from './ErrorMessage';
import { ErrorMessageProps as ErrorMessagePropsType } from './ErrorMessage.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: ErrorMessagePropsType) => (
  <ErrorMessage {...props} />
);
StandardUsage.args = { text: 'Error message' };

export default {
  title: 'Components/ErrorMessage',
  component: StandardUsage,
};

export const WithChildren = (args: ErrorMessagePropsType) => (
  <ErrorMessage {...args}>Child text</ErrorMessage>
);
