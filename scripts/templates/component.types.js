module.exports = (componentName) => ({
  content: `import type { Dictionary } from '../../utils/constants';
export interface ${componentName}Props extends Dictionary {}
`,
  extension: `.types.ts`,
});
