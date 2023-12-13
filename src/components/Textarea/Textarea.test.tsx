import React from 'react';
import { render } from '@testing-library/react';
import Textarea from './Textarea';
import { TextareaProps } from './Textarea.types';

describe('<Textarea />', () => {
  let props: TextareaProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Textarea {...props} />);

  it('prevents the `type` prop from being passed onto the Textarea element', () => {
    props.type = 'something';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Textarea');
    expect(component).not.toHaveAttribute('type');
  });

  it('will pass other props onto the Textarea element', () => {
    props['data-something'] = 'something';
    props.hidden = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Textarea');
    expect(component).toHaveAttribute('data-something', 'something');
    expect(component).toHaveAttribute('hidden');
  });
});
