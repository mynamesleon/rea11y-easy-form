import React from 'react';
import CONTROL_TYPE from '../../controlTypes';
import { EDITABLE_NATIVE_INPUT_TYPES } from '../../utils/constants';
import { capitaliseFirstLetter } from '../../utils';
import EasyForm from './EasyForm';
import { EasyFormProps } from './EasyForm.types';
import { DEFAULT_FIELD_VALIDATION_FUNCTIONS } from './EasyFormDefaultProps';
import EasyFormDocsTemplate from './EasyFormDocsTemplate.mdx';
import EasyField from '../EasyField';
import Button from '../Button';
import Input from '../Input';

const listOptions = [{ value: 'Apple' }, 'Orange', { label: 'Strawb3rry' }];
const alertOnSubmit = (values: any) => alert(JSON.stringify(values));
const errorOnSubmit = () => {
  throw new Error('Form error message here');
};
const templateArgs = {
  onSubmit: alertOnSubmit,
  noValidate: true,
};

const Template = (args: EasyFormProps) => <EasyForm {...args} />;

const exampleEmail = {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'e.g. test@test.com',
  required: 'Please enter an email address',
  validation: {
    email: 'Please enter a valid email address',
  },
};
const examplePassword = {
  name: 'password',
  type: 'password',
  label: 'Password',
  required: 'Please enter a password',
};

export const LoginForm = Template.bind({});
LoginForm.args = {
  ...templateArgs,
  header: <h2>Login</h2>,
  structure: [exampleEmail, examplePassword],
};

export const LoginFormWithStructureAndChildren = Template.bind({});
LoginFormWithStructureAndChildren.args = {
  ...templateArgs,
  structure: [exampleEmail],
  children: (
    <EasyField
      name="password"
      type="password"
      label="Password"
      required="Please enter a password"
      component={Input}
    />
  ),
} as EasyFormProps;

export const LoginFormWithHeaderAndFooter = Template.bind({});
LoginFormWithHeaderAndFooter.args = {
  ...templateArgs,
  subscription: {
    active: true,
    dirty: true,
  },
  structure: [exampleEmail, examplePassword],
  header: (
    <header>
      <h2>Login</h2>
      <p>Some info here about how you should have received your credentials</p>
    </header>
  ),
  footer: (props) => (
    <footer>
      <p>The footer props were {JSON.stringify(props)}</p>
      <Button type="submit" disabled={props.submitting} text="submit" />
    </footer>
  ),
} as EasyFormProps;

const sleepFor1SecondThenError = async () => {
  // waiting 1 second to show that the previous error message is retained
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 'This field has a 1 second async validation rule that will always error';
};
const minimumEightChars = (value: string) => value?.length < 8;

export const LoginFormWithUniqueFieldSetup = Template.bind({});
LoginFormWithUniqueFieldSetup.args = {
  ...templateArgs,
  structure: [
    {
      ...exampleEmail,
      validation: {
        ...exampleEmail.validation,
        sleepThenError: sleepFor1SecondThenError,
      },
      errorLogic: {
        error: true,
      },
      description: (
        <>
          This field&apos;s error message will always display as long as an{' '}
          <code>error</code> exists
        </>
      ),
    },
    {
      ...examplePassword,
      validateFields: ['email'],
      description:
        "Changes to this field will trigger the email field's validationas well",
    },
  ],
} as EasyFormProps;

const customComponent = ({ meta, ...props }) => (
  <div className="custom-component">
    <Input {...props} type="email" />
    <p>{JSON.stringify({ ...props, meta })}</p>
  </div>
);
export const FormWithCustomComponent = Template.bind({});
FormWithCustomComponent.args = {
  ...templateArgs,
  components: {
    'custom-component': customComponent,
  },
  structure: [
    {
      type: 'custom-component',
      meta: true,
      name: 'custom-component-example-1',
      label: 'Custom component example 1',
    },
    {
      type: 'email',
      meta: true,
      description: (
        <>
          This <code>type</code> has been overridden by our custom component
        </>
      ),
      name: 'custom-component-example-2',
      label: 'Custom component example 2',
      component: customComponent,
      required: true,
    },
    {
      type: 'does-not-exist',
      meta: true,
      name: 'custom-component-example-3',
      label: 'Custom component example 3',
      render: customComponent,
    },
    {
      type: 'does-not-exist',
      name: 'custom-component-example-4',
      label: 'Custom component example 4',
    },
  ],
};

export const LoginFormWithUniqueFormAndFieldSetup = Template.bind({});
LoginFormWithUniqueFormAndFieldSetup.args = {
  ...templateArgs,
  defaultFieldErrorLogic: {
    error: true,
  },
  defaultFieldValidationFunctions: {
    minimumEightChars,
    sleepFor1SecondThenError,
  },
  defaultFieldConfig: {
    placeholder: 'Default config placeholder',
    subscription: { active: true },
  },
  structure: [
    {
      ...exampleEmail,
      validation: {
        ...exampleEmail.validation,
        sleepFor1SecondThenError: true,
      },
      description: (
        <>
          This field&apos;s error message will always display as long as an{' '}
          <code>error</code> exists, due to the{' '}
          <code>defaultFieldErrorLogic</code> prop
        </>
      ),
    },
    {
      ...examplePassword,
      validation: {
        minimumEightChars: 'The password must contain at least 8 characters',
        sleepFor1SecondThenError:
          "Here's a custom `sleepFor1SecondThenError` message",
        doesNotExist:
          'This rule will be ignored, because there is no function for it',
      },
      validateFields: ['email'],
      errorLogic: {
        touched: true,
      },
      description: (
        <>
          Changes to this field will trigger the email field&apos;s validation
          as well;
          <br />
          though this field&apos;s error message will only display once it has
          been <code>touched</code> due to overriding the{' '}
          <code>defaultFieldErrorLogic</code>
        </>
      ),
    },
  ],
} as EasyFormProps;

export const LoginFormWithStaticLabelsValidationSummary = Template.bind({});
LoginFormWithStaticLabelsValidationSummary.args = {
  ...templateArgs,
  header: <h2>Login</h2>,
  structure: [
    exampleEmail,
    examplePassword,
    {
      type: 'checkbox',
      name: 'human',
      label: 'Are you human?',
      required: true,
    },
  ],
  validationSummary: {
    header: 'The following fields require attention:',
    position: 'beforeend',
    content: 'labels',
    mode: 'static',
  },
} as EasyFormProps;

export const LoginFormWithSubmitError = Template.bind({});
LoginFormWithSubmitError.args = {
  ...templateArgs,
  header: <h2>Login</h2>,
  onSubmit: errorOnSubmit,
  structure: [exampleEmail, examplePassword],
} as EasyFormProps;

export const FormWithAllNativeEditableInputs = Template.bind({});
FormWithAllNativeEditableInputs.args = {
  ...templateArgs,
  header: (
    <>
      <h2>Native editable inputs example</h2>
      <p>
        This is a basic form structure utilising all of the default editable
        input types (plus the <code>{CONTROL_TYPE.SWITCH}</code> and{' '}
        <code>{CONTROL_TYPE.TEXTAREA}</code> types).
      </p>
      <p>
        By default, these will all use the <code>Input</code> component included
        in this library. But, as with most things around here, that can be
        overridden.
      </p>
    </>
  ),
  structure: [
    ...[
      ...EDITABLE_NATIVE_INPUT_TYPES,
      CONTROL_TYPE.SWITCH,
      CONTROL_TYPE.TEXTAREA,
    ].map((type) => {
      const typeCapitalised = capitaliseFirstLetter(type);
      const result: any = {
        type,
        name: type,
        label: `${typeCapitalised} field`,
        description: `${typeCapitalised} field description`,
      };
      if (type in DEFAULT_FIELD_VALIDATION_FUNCTIONS) {
        result.validation = {
          [type]: `Please enter a valid ${type}`,
        };
      }
      return result;
    }),
  ],
};

export const ListTypes = Template.bind({});
ListTypes.args = {
  noValidate: true,
  onSubmit: alertOnSubmit,
  header: (
    <>
      <h2>List types example</h2>
      <p>
        Another basic form structure example showing the various list types all
        placed within a <code>{CONTROL_TYPE.FIELDSET}</code> container
      </p>
    </>
  ),
  structure: [
    {
      type: 'checkboxlist',
      name: 'checkboxlist',
      label: 'Checkbox list',
      options: listOptions,
    },
    {
      type: 'radiolist',
      name: 'radiolist',
      label: 'Radio list',
      options: listOptions,
    },
    {
      type: 'switchlist',
      name: 'switchlist',
      label: 'Switch list',
      options: listOptions,
    },
    {
      type: 'select',
      name: 'select',
      label: 'Select',
      options: [{ label: 'Please select', value: '' }, ...listOptions],
      required: 'Pick a value',
      validation: {
        alpha: 'Alpha value only please',
      },
    },
    {
      type: 'repeater',
      name: 'repeater',
      label: 'repeater',
      children: [exampleEmail],
    },
  ],
};

export default {
  title: 'EasyForm',
  component: EasyForm,
  parameters: {
    docs: {
      page: EasyFormDocsTemplate,
    },
  },
};
