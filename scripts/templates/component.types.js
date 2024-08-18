module.exports = (componentName) => ({
  content: `import type { ComponentProps, PropsWithChildren } from 'react';
export type ${componentName}Props = {
  /**
   * Class name to add to the container element
   */
  className?: string;
} & PropsWithChildren<ComponentProps<'div'>>;
`,
  extension: `.types.ts`,
});
