import React from 'react';
import Notice from './Notice';
import { NoticeProps } from './Notice.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: NoticeProps) => <Notice {...props} />;

StandardUsage.args = {
  text: 'Notice text',
};

/**
 * A very basic Notice box,
 * for displaying errors, warnings, success messages, or general information
 */
export default {
  title: 'Components/Notice',
  component: StandardUsage,
};
