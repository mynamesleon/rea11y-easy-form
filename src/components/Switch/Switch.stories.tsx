import React from 'react';
import Switch from './Switch';
import { SwitchProps, SWITCH_TYPE } from './Switch.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const UnControlled = (props: SwitchProps) => <Switch {...props} />;

/**
 * Used for checkboxes, radio buttons, and switches.
 *
 * Note: when the `type` is set to `'switch'`,
 * the component is still using a checkbox as the focusable element, with `role='switch'` added;
 * this is to progressively enhance the checkbox, as not all screen-readers support the 'switch' role.
 * See [the w3 switch checkbox example](https://www.w3.org/WAI/ARIA/apg/example-index/switch/switch-checkbox.html).
 */
export default {
  title: 'Components/Switch',
  component: UnControlled,
  argTypes: {
    type: {
      defaultValue: SWITCH_TYPE.SWITCH,
    },
    checked: {
      if: { arg: 'checked', exists: true },
    },
    strings: {
      if: { arg: 'type', eq: SWITCH_TYPE.SWITCH },
    },
    onChange: {
      action: 'change',
    },
    onFocus: {
      action: 'focus',
    },
    onBlur: {
      action: 'blur',
    },
  },
};

export const Controlled = (args: SwitchProps) => <Switch {...args} />;
Controlled.args = {
  checked: true,
  type: SWITCH_TYPE.SWITCH,
  strings: {
    on: 'On',
    off: 'Off',
  },
};
