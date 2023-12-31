import React from 'react';
import { Form } from 'react-final-form';
import Input from '../Input';
import Button from '../Button';
import EasyForm from '../EasyForm';
import EasyField from './EasyField';
import type { EasyFieldProps } from './EasyField.types';
import EasyFieldDocsTemplate from './EasyFieldDocsTemplate.mdx';

const renderExampleInput = ({ meta, ...other }) => (
  <>
    <Input {...other} />
    {Boolean(meta) && <p>{JSON.stringify(meta)}</p>}
  </>
);

const templateArgs = {
  name: 'email',
  type: 'email',
  label: 'Email',
  render: renderExampleInput,
  description: 'An example field description, because why not?',
  required: 'Please enter an email',
  validation: {
    email: 'Please enter a valid email address',
  },
};

const alertOnSubmit = (values: any) => alert(JSON.stringify(values));

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const SimpleExampleInAnEasyForm = (props: EasyFieldProps) => (
  <EasyForm onSubmit={alertOnSubmit} noValidate>
    <EasyField {...props} />
  </EasyForm>
);
SimpleExampleInAnEasyForm.args = { ...templateArgs };

export const OrdinaryFormExample = (props: EasyFieldProps) => (
  <Form onSubmit={alertOnSubmit}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <EasyField {...props} />
        <Button type="submit" text="Submit" />
      </form>
    )}
  </Form>
);
OrdinaryFormExample.args = { ...templateArgs };

export const SubscriptionsExample = () => (
  <EasyForm onSubmit={alertOnSubmit}>
    <EasyField
      meta
      render={renderExampleInput}
      name="default-subscription"
      label="Default subscription example"
    />
    <EasyField
      meta
      render={renderExampleInput}
      name="partial-subscription"
      label="Partial subscription example"
      subscription={{
        active: true,
        dirty: true,
      }}
    />
    <EasyField
      meta
      render={renderExampleInput}
      subscription={undefined}
      name="all-subscription"
      label="All subscription example"
    />
  </EasyForm>
);

const validateBob = async (value: any) => {
  // waiting 1 second to show that the previous error message is retained
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (value?.toLowerCase() !== 'bob') {
    return "Value must be 'bob'";
  }
};
export const ValidationExample = () => (
  <EasyForm onSubmit={alertOnSubmit}>
    <EasyField
      render={renderExampleInput}
      label="First example (required, alpha, lowercase, bob)"
      description="Changes to this field will not validate other fields"
      name="first"
      required
      validation={{
        alpha: 'Please enter alpha characters only',
        lowercase: true,
      }}
      validate={validateBob}
      meta
    />
    <EasyField
      render={renderExampleInput}
      label="Second example (required, bob)"
      description="Changes to this field will also validate the first field"
      validateFields={['first']}
      name="second"
      validation={{
        required: 'This field is required',
        bob: validateBob,
      }}
      meta
    />
    <EasyField
      render={renderExampleInput}
      label="Third example (required, alpha)"
      description={
        <>
          Changes to this field will also validate all other fields.
          <br />
          This field&apos;s error message will also only display when the field
          is <code>active</code> and <b>not</b>{' '}
          <code>dirtySinceLastSubmit</code>
        </>
      }
      errorLogic={{
        dirtySinceLastSubmit: false,
        active: true,
      }}
      validateFields={undefined}
      name="third"
      validation={{
        required: true,
        alpha: true,
      }}
      meta
    />
  </EasyForm>
);

export default {
  title: 'EasyField',
  component: SimpleExampleInAnEasyForm,
  parameters: {
    docs: {
      page: EasyFieldDocsTemplate,
    },
  },
};
