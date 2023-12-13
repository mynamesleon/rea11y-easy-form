import React from 'react';
import Disclosure from './Disclosure';
import { DisclosureProps } from './Disclosure.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: DisclosureProps) => (
  <Disclosure {...props}>
    An apple is a sweet, edible fruit produced by an apple tree (Malus
    domestica). Apple trees are cultivated worldwide and are the most widely
    grown species in the genus Malus. The tree originated in Central Asia, where
    its wild ancestor, Malus sieversii, is still found today. Apples have been
    grown for thousands of years in Asia and Europe and were brought to North
    America by European colonists. Apples have religious and mythological
    significance in many cultures, including Norse, Greek and European Christian
    tradition.
  </Disclosure>
);

StandardUsage.args = {
  summary: 'Tell me about apples',
};

export default {
  title: 'Components/Disclosure',
  component: StandardUsage,
  argTypes: {
    onChange: {
      action: 'change',
    },
  },
};

export const Disabled = StandardUsage.bind({});
Disabled.args = {
  disabled: true,
  label: 'Tell me about apples',
  defaultOpen: true,
  component: 'article',
};
