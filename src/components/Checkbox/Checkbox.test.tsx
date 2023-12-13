import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from './Checkbox';
import Switch, { SWITCH_TYPE } from '../Switch';
import { CheckboxProps } from './Checkbox.types';

jest.mock('../Switch', () => ({
  __esModule: true,
  ...jest.requireActual('../Switch'),
  default: jest.fn(() => null),
}));

describe('<Checkbox />', () => {
  let props: CheckboxProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Checkbox {...props} />);

  it('should pass props along to the Switch component', () => {
    props.defaultChecked = true;
    props['aria-hidden'] = true;
    props.onChange = jest.fn();
    renderComponent();
    expect(Switch).toHaveBeenCalledWith(
      expect.objectContaining(props),
      expect.any(Object)
    );
  });

  it('should pass classNames along to the Switch component', () => {
    props.className = 'className';
    renderComponent();
    expect(Switch).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining(props.className),
      }),
      expect.any(Object)
    );
  });

  it('should render the Switch component with a fixed type', () => {
    props.type = SWITCH_TYPE.RADIO;
    renderComponent();
    expect(Switch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: SWITCH_TYPE.CHECKBOX,
      }),
      expect.any(Object)
    );
  });
});
