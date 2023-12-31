import React from 'react';
import { Form } from 'react-final-form';
import SwitchList from './SwitchList';
import { SwitchListProps, SWITCH_LIST_TYPE } from './SwitchList.types';
import Button from '../Button';

const alertData = (data: any) => window.alert(JSON.stringify(data, null, 3));

const options = [
  {
    label: 'United kingdom',
  },
  'Wales',
  {
    value: 'Northern ireland',
    label: 'Northern ireland',
  },
  {
    value: 'Republic of ireland',
    disabled: true,
  },
  {
    value: 'Scotland',
    label: 'Scotland',
    className: 'scotland',
  },
];

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: SwitchListProps) => (
  <Form onSubmit={alertData}>
    {({ handleSubmit, form: { reset } }) => (
      <form onSubmit={handleSubmit}>
        <SwitchList {...props} />
        <Button type="submit" text="Submit" />
        <Button
          type="reset"
          onClick={reset}
          text="reset"
          variant="destructive"
        />
        <p />
      </form>
    )}
  </Form>
);

StandardUsage.args = {
  name: 'countries-1',
  options,
};

/**
 * Unlike other form field components,
 * the `<SwitchList>` (and components that rely on it) __must__ be contained within a `<Form>`
 * (from react-final-form, or this library's `<EasyForm>`).
 * This is because each `<Switch>` is rendered inside of a react-final-form `<Field>` internally
 * in order to subscribe to the value of the whole list.
 */
export default {
  title: 'Components/SwitchList',
  component: StandardUsage,
  argTypes: {
    type: {
      defaultValue: SWITCH_LIST_TYPE.SWITCH,
    },
  },
};
