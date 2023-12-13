import React from 'react';
import { render } from '@testing-library/react';
import SwitchList from './SwitchList';
import { SwitchListProps } from './SwitchList.types';

// @todo: write SwitchList tests

describe('<SwitchList />', () => {
  let props: SwitchListProps;

  beforeEach(() => {
    props = {
      name: 'SwitchList',
    };
  });

  const renderComponent = () => render(<SwitchList {...props} />);

  it.skip('should render', () => {
    props.children = 'leon was here';
    const { getByTestId } = renderComponent();
    const component = getByTestId('SwitchList');
    expect(component).toHaveTextContent('leon was here');
  });
});
