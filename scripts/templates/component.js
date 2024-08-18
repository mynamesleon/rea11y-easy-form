module.exports = (componentName) => ({
  content: `import clsx from 'clsx';
import React, { forwardRef, memo } from 'react';
import type { ${componentName}Props } from './${componentName}.types';
import { polymorphicForwardRef, useFieldClassName } from '../../utils';

const ${componentName} = polymorphicForwardRef<'div', ${componentName}Props>(
  (
    { children, className }, 
    ref
  ) => {
    const classPrefix = useFieldClassName('${componentName.toLowerCase()}');
    return (
      <div
        className={clsx(className, classPrefix)}
        data-testid='${componentName}'
        className={classPrefix}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const Memoised${componentName} = memo(${componentName});
Memoised${componentName}.displayName = '${componentName}';
export default Memoised${componentName} as typeof ${componentName};

`,
  extension: `.tsx`,
});
