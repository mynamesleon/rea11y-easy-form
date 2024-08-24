import React from 'react';
import Fieldset from './Fieldset';
import { FieldsetProps } from './Fieldset.types';
import Input from '../Input';
import EasyField from '../EasyField';
import EasyForm from '../EasyForm';

const children = (
  <>
    <EasyField name="name" type="text" label="Name" component={Input} />
    <EasyField name="email" type="email" label="Email" component={Input} />
    <EasyField
      name="telephone"
      type="tel"
      label="Contact number"
      component={Input}
    />
  </>
);

export default {
  title: 'Components/Fieldset',
  component: Fieldset,
};

export const StandardUsage = (props: FieldsetProps) => (
  <EasyForm>
    <Fieldset {...props} />
  </EasyForm>
);

StandardUsage.args = {
  legend: 'Contact details',
  children,
};

export const VisuallyHiddenLegend = StandardUsage.bind({});
VisuallyHiddenLegend.args = {
  visuallyHiddenLegend: true,
  label: 'Contact details',
  children,
};
