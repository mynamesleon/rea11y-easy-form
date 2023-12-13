module.exports = (componentName) => ({
  content: `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';
import { ${componentName}Props } from './${componentName}.types';

describe('<${componentName} />', () => {
  let props: ${componentName}Props;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<${componentName} {...props} />);

  it.skip('should render', () => {
    props.children = 'leon was here';
    const { getByTestId } = renderComponent();
    const component = getByTestId('${componentName}');
    expect(component).toHaveTextContent('leon was here');
  });
});
`,
  extension: `.test.tsx`,
});
