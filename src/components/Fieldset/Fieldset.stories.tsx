import React from 'react';
import Fieldset from './Fieldset';
import { FieldsetProps } from './Fieldset.types';

export default {
  title: 'Components/Fieldset',
  component: Fieldset,
};

export const StandardUsage = (props: FieldsetProps) => <Fieldset {...props} />;
StandardUsage.args = {
  legend: 'Legend text',
  children: 'Children go here',
};

export const VisuallyHiddenLegend = StandardUsage.bind({});
VisuallyHiddenLegend.args = {
  visuallyHiddenLegend: true,
  children: 'Children go here',
  label: 'Legend text',
};
