import React from 'react';
import AsHtml from './AsHtml';
import { AsHtmlProps } from './AsHtml.types';

export const StandardUsage = (props: AsHtmlProps) => <AsHtml {...props} />;

StandardUsage.args = {
  html: "<p style='display:inline'>para</p><script>alert('test')</script><style>p{color:pink}</style>",
};

/**
 * ![Dependency: dompurify](https://img.shields.io/badge/Dependency-dompurify-blue)
 *
 * Render provided string as HTML.
 * Sanitizes with `dompurify` by default.
 */
export default {
  title: 'Components/AsHtml',
  component: StandardUsage,
};
