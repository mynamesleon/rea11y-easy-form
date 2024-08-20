import React from 'react';
import Input from '../Input';
import FieldRepeater from './FieldRepeater';
import EasyForm from '../EasyForm';
import EasyField from '../EasyField';
import type { FieldRepeaterProps } from './FieldRepeater.types';
import type { EasyFormProps } from '../EasyForm/EasyForm.types';
import { FIELD_REPEATER_STRINGS_KEYS } from './FieldRepeaterContext.types';
import CONTROL_TYPE from '../../controlTypes';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: FieldRepeaterProps) => (
  <EasyForm
    initialValues={{
      repeater: [{ name: 'Some One', email: 'some.one@example.com' }],
    }}
    onSubmit={(values) => alert(JSON.stringify(values))}
  >
    <FieldRepeater {...props}>
      {(args) => (
        <>
          <EasyField
            label="Name"
            name={`${args.name}.name`}
            component={Input}
          />
          <EasyField
            label="Email"
            name={`${args.name}.email`}
            component={Input}
            type="email"
          />
          <p>
            FieldRepeater children function received arg:{' '}
            <code>{JSON.stringify(args)}</code>
          </p>
        </>
      )}
    </FieldRepeater>
  </EasyForm>
);

StandardUsage.args = {
  defaultValues: {
    name: 'John Doe',
    email: 'john@doe.example',
  },
  name: 'field-repeater',
  max: 10,
  min: 1,
};

/**
 * ![Dependency: react-beautiful-dnd](https://img.shields.io/badge/Dependency-react--beautiful--dnd-blue)
 *
 * The `FieldRepeater` **must** be used within a `<Form>` or `<EasyForm>`,
 * and its `children` **must** be a function. The function will receive
 * an object argument containing `name`, `length`, and `index` properties.
 *
 * The `name` provided will be based on the `name` prop used for the `FieldRepeater`.
 *
 * e.g. the first entry in this example `FieldRepeater` would have a `name` of
 * `'users[0].name'`
 *
 * ```
 * <FieldRepeater {...props} name='users'>
 *   {({ name }) => (
 *     <EasyField
 *       label="Name"
 *       component={Input}
 *       name={`${name}.name`}
 *     />
 *   )}
 * </FieldRepeater>
 * ```
 */
export default {
  title: 'Components/FieldRepeater',
  component: StandardUsage,
  argTypes: {
    ...FIELD_REPEATER_STRINGS_KEYS.reduce((acc, str) => {
      acc[str] = { control: 'text' };
      return acc;
    }, {}),
  },
};

export const EasyFormStructureExample = (props: EasyFormProps) => (
  <EasyForm {...props} />
);

EasyFormStructureExample.args = {
  onSubmit: (values: any) => alert(JSON.stringify(values)),
  initialValues: {
    repeater: [
      {
        name: 'Some One',
        email: 'some.one@example.com',
      },
    ],
  },
  structure: [
    {
      type: CONTROL_TYPE.REPEATER,
      legend: 'Users',
      defaultValues: {
        name: 'John Doe',
        email: 'john@doe.example',
      },
      children: [
        {
          type: 'text',
          name: 'name',
          label: 'Name',
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email',
        },
      ],
      name: 'field-repeater',
      min: 1,
      max: 10,
    },
  ],
};
