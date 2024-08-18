import React, { type ComponentProps } from 'react';
import { render } from '@testing-library/react';
import EasyForm from './EasyForm';

describe('<EasyForm />', () => {
  let props: ComponentProps<typeof EasyForm>;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<EasyForm {...props} />);

  it.skip('should render', () => {
    props.children = 'leon was here';
    const { getByTestId } = renderComponent();
    const component = getByTestId('EasyForm');
    expect(component).toHaveTextContent('leon was here');
  });
});
