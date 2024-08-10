import React from 'react';
import FieldConditional from './FieldConditional';
import type { FieldConditionalProps } from './FieldConditional.types';
import EasyForm from '../EasyForm';
import Notice, { NOTICE_TYPE } from '../Notice';
import EasyField from '../EasyField';
import Input from '../Input';

const INITIAL_VALUES = {
  first: 'first',
  second: 'second',
  'grand-parent': {
    child: 'child',
    parent: {
      'grand-child': 'grand-child',
    },
  },
};

const ExampleTextFields = () =>
  [
    'first',
    'second',
    'grand-parent.child',
    'grand-parent.parent.grand-child',
  ].map((name) => (
    <EasyField name={name} label={name} key={name} component={Input} />
  ));

const Template = (args: FieldConditionalProps) => (
  <EasyForm initialValues={INITIAL_VALUES}>
    <FieldConditional {...args}>
      <Notice type={NOTICE_TYPE.SUCCESS} text="Congratulations!" />
    </FieldConditional>
    <ExampleTextFields />
  </EasyForm>
);

export const LogicalAndExample = Template.bind({});
LogicalAndExample.args = {
  if: {
    first: 'first',
    'grand-parent.parent.grand-child': 'grand-child',
  },
  ifNot: {
    second: 'third',
  },
};

/**
 * The `FieldConditional` is a handy wrapper
 * for only rendering its `children` if other fields in your form
 * have the values that you want.
 *
 * Using key-value pairs, you can specify what values should
 * or should not exist. By default, all values must match
 * for the `children` to render, but you can use OR logic as well.
 *
 * The values in the key-value pairs can be any type, where objects
 * and arrays will automatically do a deep comparison check.
 * If you need more specific comparison logic, you can also pass a function
 * as the value, which will receive 2 arguments:
 * that field's current value, and the final-form API.
 *
 * If no conditions are specified in the component's props,
 * then it will just render the provided `children`.
 */
export default {
  title: 'Components/FieldConditional',
  component: LogicalAndExample,
};

export const LogicalOrExample = Template.bind({});
LogicalOrExample.args = {
  if: {
    first: 'second',
    second: 'third',
  },
  ifLogic: 'OR',
  ifNot: {
    'grand-parent.child': 'child',
    'grand-parent.parent.grand-child': 'grand-child',
  },
  ifNotLogic: 'OR',
  logic: 'OR',
};

export const CombinationLogicExample = Template.bind({});
CombinationLogicExample.args = {
  if: {
    first: (value: string) => value?.toLowerCase() === 'second',
    second: 'third',
  },
  ifLogic: 'OR',
  ifNot: {
    'grand-parent.child': 'child',
    'grand-parent.parent.grand-child': 'grand-child',
  },
};
