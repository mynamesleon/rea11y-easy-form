import React from 'react';
import Radio from './Radio';
import { RadioProps } from './Radio.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: RadioProps) => <Radio {...props} />;

/**
 * A basic wrapper around the `<Switch />` component, with a default `type`.
 */
export default {
  title: 'Components/Radio',
  component: StandardUsage,
};
