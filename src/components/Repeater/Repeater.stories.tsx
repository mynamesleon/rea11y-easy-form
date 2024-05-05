import React from 'react';
import Input from '../Input';
import Repeater from './Repeater';
import EasyForm from '../EasyForm';
import EasyField from '../EasyField';
import type { RepeaterProps } from './Repeater.types';
import type { EasyFormProps } from '../EasyForm/EasyForm.types';
import { REPEATER_STRINGS_KEYS } from './RepeaterContext.types';
import CONTROL_TYPE from '../../controlTypes';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: RepeaterProps) => (
  <EasyForm onSubmit={(values) => alert(JSON.stringify(values))}>
    <Repeater {...props}>
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
            Repeater children function received arg:{' '}
            <code>{JSON.stringify(args)}</code>
          </p>
        </>
      )}
    </Repeater>
  </EasyForm>
);

StandardUsage.args = {
  defaultValues: {
    name: 'John Doe',
    email: 'john@doe.example',
  },
  name: 'repeater',
  max: 10,
  min: 1,
};

/**
 * The `Repeater` **must** be used within a `<Form>` or `<EasyForm>`,
 * and its `children` **must** be a function. The function will receive
 * an object argument containing `name`, `length`, and `index` properties.
 *
 * The `name` provided will be based on the `name` prop used for the `Repeater`.
 *
 * e.g. the first entry in this example `Repeater` would have a `name` of
 * `'users[0].name'`
 *
 * ```
 * <Repeater {...props} name='users'>
 *   {({ name }) => (
 *     <EasyField
 *       label="Name"
 *       component={Input}
 *       name={`${name}.name`}
 *     />
 *   )}
 * </Repeater>
 * ```
 */
export default {
  title: 'Components/Repeater (in progress!!!)',
  component: StandardUsage,
  argTypes: {
    ...REPEATER_STRINGS_KEYS.reduce((acc, str) => {
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
  structure: [
    {
      type: CONTROL_TYPE.FIELDSET,
      label: 'Users',
      children: [
        {
          type: CONTROL_TYPE.REPEATER,
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
          name: 'repeater',
          min: 1,
          max: 10,
        },
      ],
    },
  ],
};
