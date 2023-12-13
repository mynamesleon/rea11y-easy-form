import React from 'react';
import { Form } from 'react-final-form';
import Select from './Select';
import { SelectProps } from './Select.types';
import EasyField from '../EasyField';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const WithOptionsProp = (props: SelectProps) => <Select {...props} />;

WithOptionsProp.args = {
  name: 'with-options-prop',
  className: 'some-class-name',
  defaultValue: 'disabled selected entry with label used as value',
  options: [
    {
      value: '',
      label: 'Please select',
    },
    'String entry',
    {
      label: 'disabled selected entry with label used as value',
      disabled: true,
    },
    {
      label: 'Option group',
      children: [
        'string optgroup child',
        {
          label: 'Disabled optgroup child',
          disabled: true,
        },
      ],
    },
    {
      label: 'Disabled optgroup',
      disabled: true,
      children: ['First', 'Second'],
    },
  ],
};

/**
 * An ordinary html `<select>` element, but with processing of an optional `options` prop
 * to render the children (and to leverage memoisation). Ordinary React `children` can also be used.
 *
 * All other props (`className`, `id`, `name`, etc.) are passed directly onto the `<select>` element.
 */
export default {
  title: 'Components/Select',
  component: WithOptionsProp,
};

const alertData = (data: any) => window.alert(JSON.stringify(data, null, 3));
export const WithChildrenInAnEasyField = (args: SelectProps) => (
  <Form onSubmit={alertData}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <EasyField
          {...args}
          label="Select a thing"
          description="EasyField description"
          render={({ input, meta, ...other }) => (
            <Select {...other} {...input}>
              <option value="">Please select</option>
              <option>String entry</option>
              <option disabled>disabled entry</option>
              <optgroup label="Option group">
                <option>optgroup child</option>
                <option disabled>Disabled optgroup child</option>
              </optgroup>
              <optgroup label="Disabled optgroup" disabled>
                <option>First</option>
                <option>Second</option>
              </optgroup>
            </Select>
          )}
        />
      </form>
    )}
  </Form>
);

WithChildrenInAnEasyField.args = {
  name: 'with-children',
};
