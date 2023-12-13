import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import { ErrorMessageProps } from './ErrorMessage.types';

describe('<ErrorMessage />', () => {
  let props: ErrorMessageProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<ErrorMessage {...props} />);

  it('takes a text prop', () => {
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('ErrorMessage');
    expect(component).toHaveTextContent(props.text as string);
  });

  it('takes a children prop', () => {
    props.children = <div className="test">test</div>;
    const { getByTestId } = renderComponent();
    const component = getByTestId('ErrorMessage');
    const testDiv = component.querySelector('.test');
    expect(testDiv).not.toBeNull();
    expect(testDiv).toHaveTextContent('test');
  });

  it('renders nothing if no children or text prop is provided', () => {
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('ErrorMessage');
    expect(component).toBeNull();
  });

  it('passes other props onto the element', () => {
    props.text = 'text';
    props['data-something'] = 'something';
    props.hidden = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('ErrorMessage');
    expect(component).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(component).toHaveAttribute('hidden');
  });
});
