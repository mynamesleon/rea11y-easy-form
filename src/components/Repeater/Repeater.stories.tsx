import React from 'react';
import Repeater from './Repeater';
import EasyForm from '../EasyForm';
import EasyField from '../EasyField';
import Input from '../Input';
import { RepeaterProps } from './Repeater.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: RepeaterProps) => (
  <EasyForm onSubmit={() => {}}>
    {() => (
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
          </>
        )}
      </Repeater>
    )}
  </EasyForm>
);

StandardUsage.args = {
  defaultValues: {
    name: 'John Doe',
    email: 'john@doe.example',
  },
  name: 'repeater',
  max: 10,
  min: 2,
};

export default {
  title: 'Components/Repeater',
  component: StandardUsage,
};
