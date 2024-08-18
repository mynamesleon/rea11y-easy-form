module.exports = (componentName) => ({
  content: `import React, { type ComponentPropsWithoutRef } from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('<${componentName} />', () => {
  let props: ComponentPropsWithoutRef<typeof ${componentName}>;

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
