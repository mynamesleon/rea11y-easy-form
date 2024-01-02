import React from 'react';
import { render } from '@testing-library/react';
import type { ButtonProps } from './Button.types';
import { fieldClassName } from '../../utils';
import Button from './Button';

describe('<Button />', () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Button {...props} />);

  it('should render using the text prop', () => {
    props.text = 'button';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Button');
    expect(component).toHaveTextContent(props.text as string);
  });

  it('also renders the children prop', () => {
    props.children = <span data-testid="child-span" />;
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('child-span')).toBeInTheDocument();
  });

  it('should render with a default className, and support others', () => {
    props.text = 'button';
    props.className = 'test-class';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Button');
    expect(component).toHaveClass(props.className);
    expect(component).toHaveClass(fieldClassName('button'));
  });
});
