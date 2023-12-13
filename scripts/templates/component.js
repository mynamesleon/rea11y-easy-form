module.exports = (componentName) => ({
  content: `import React, { ElementType, forwardRef, memo } from 'react';
import { ${componentName}Props } from './${componentName}.types';

const ${componentName} = forwardRef<any, ${componentName}Props>(
  (
    { children }, 
    ref
  ) => (
    <div data-testid='${componentName}' ref={ref}>{children}</div>
  )
);

const Memoised${componentName} = memo(${componentName});
Memoised${componentName}.displayName = '${componentName}';
export default Memoised${componentName};

`,
  extension: `.tsx`,
});
