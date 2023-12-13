import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';
import { InputProps } from './Input.types';
import { EDITABLE_NATIVE_INPUT_TYPES, fieldClassName } from '../../utils';

describe('<Input />', () => {
  let props: InputProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Input {...props} />);

  it('will pass props onto the Input element', () => {
    props['data-something'] = 'something';
    props.hidden = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Input');
    expect(component).toHaveAttribute('data-something', 'something');
    expect(component).toHaveAttribute('hidden');
  });

  it.each(EDITABLE_NATIVE_INPUT_TYPES)(
    'sets a className based on the provided `type`: %s',
    (type) => {
      props.type = type;
      const classPrefix = fieldClassName('input');
      const { getByTestId } = renderComponent();
      const component = getByTestId('Input');
      expect(component).toHaveClass(`${classPrefix}--${type}`);
    }
  );
});
