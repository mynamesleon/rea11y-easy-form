import React from 'react';
import ValidationSummary from './ValidationSummary';
import { ValidationSummaryProps } from './ValidationSummary.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: ValidationSummaryProps) => (
  <ValidationSummary {...props} />
);

StandardUsage.args = {
  intro: 'Validation summary intro string',
  error: 'Error text',
};

/**
 * A wrapper around the `<Notice />` component, that can take a single `error`,
 * and/or multiple `errors` to be rendered in an unordered list.
 * When using `errors`, flat or deep objects and arrays can be used,
 * and they will be flattened internally to be rendered.
 * This is to allow for the potentially complex `errors` object from `FormState`.
 */
export default {
  title: 'Components/ValidationSummary',
  component: StandardUsage,
};

const Template = (args: ValidationSummaryProps) => (
  <ValidationSummary {...args} />
);

export const WithErrorConstruct = Template.bind({});
WithErrorConstruct.args = { error: new Error('Error message text') };

export const WithErrorsArray = Template.bind({});
WithErrorsArray.args = { errors: ['Error 1', 'Error 2', 'Error 3'] };

export const WithDeepLevelErrorsObject = Template.bind({});
WithDeepLevelErrorsObject.args = {
  errors: {
    first: 'error1',
    second: 'error2',
    third: ['error3', 'error4'],
    fourth: {
      fifth: 'error5',
      sixth: [
        new Error('error6'),
        {
          seventh: <div className="test">error7</div>,
        },
      ],
    },
  },
};

export const WithDeepLevelErrorsArray = Template.bind({});
WithDeepLevelErrorsArray.args = {
  errors: [
    'error1',
    'error2',
    [
      'error3',
      'error4',
      [
        'error5',
        new Error('error6'),
        <div key="test" className="test">
          error7
        </div>,
      ],
    ],
  ],
};

export const WithReactNodes = Template.bind({});
WithReactNodes.args = {
  header: <p>Your very own intro</p>,
  error: <code>Error text in a code tag? Why not!</code>,
  errors: [<p key="error 1">Error 1</p>, <div key="error 2">Error 2</div>],
};
