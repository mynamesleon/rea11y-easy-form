import React from 'react';
import AsHtml from './AsHtml';
import { AsHtmlProps } from './AsHtml.types';

export const StandardUsage = (props: AsHtmlProps) => <AsHtml {...props} />;

StandardUsage.args = {
  html: "<p style='display:inline'>para</p><script>alert('test')</script><style>p{color:pink}</style>",
};

export default {
  title: 'Components/AsHtml',
  component: StandardUsage,
};
