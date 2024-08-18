module.exports = (componentName) => ({
  content: `import type { ComponentPropsWithoutRef } from 'react';
export type ${componentName}Props = {
  /**
   * Class name to add to the container element
   */
  className?: string;
} & ComponentPropsWithoutRef<'div'>;
`,
  extension: `.types.ts`,
});
