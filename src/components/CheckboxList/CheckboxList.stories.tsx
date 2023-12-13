import React from 'react';
import { Form } from 'react-final-form';
import CheckboxList from './CheckboxList';
import { CheckboxListProps } from './CheckboxList.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

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

export const StandardUsage = (props: CheckboxListProps) => (
  <Form onSubmit={() => {}}>
    {() => (
      <form>
        <CheckboxList {...props} />
      </form>
    )}
  </Form>
);

StandardUsage.args = {
  legend: 'Countries',
  name: 'countries',
  options,
};

/**
 * A basic wrapper around the `<SwitchList />` component, with a fixed `type`.
 *
 * Unlike other form field components,
 * the `<SwitchList>` (and components that rely on it) __must__ be contained within a `<Form>`
 * (from react-final-form, or this library's `<EasyForm>`).
 * This is because each `<Switch>` is rendered inside of a react-final-form `<Field>` internally
 * in order to subscribe to the value of the whole list.
 */
export default {
  title: 'Components/CheckboxList',
  component: StandardUsage,
};
