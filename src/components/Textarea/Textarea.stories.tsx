import React from 'react';
import Textarea from './Textarea';
import { TextareaProps } from './Textarea.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: TextareaProps) => <Textarea {...props} />;

/**
 * A basic textarea component, mainly to be used by the `<EasyForm>` component.
 * The docs may show a `type` prop, but this is only included in the
 * interface for the textarea so that the `type` in the `<EasyForm>` `structure`
 * array does not get passed to the `<textarea>` element
 */
export default {
  title: 'Components/Textarea',
  component: StandardUsage,
};
