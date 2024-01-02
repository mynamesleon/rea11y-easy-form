module.exports = (componentName) => ({
  content: `import React from 'react';
import ${componentName} from './${componentName}';
import type { ${componentName}Props } from './${componentName}.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334
export const StandardUsage = (props: ${componentName}Props) => <${componentName} {...props} />;

export default {
  title: 'Components/${componentName}',
  component: StandardUsage,
};

const Template = (args: ${componentName}Props) => <${componentName} {...args} />;

export const ${componentName}Variant = Template.bind({});
${componentName}Variant.args = { something: true };
`,
  extension: `.stories.tsx`,
});
