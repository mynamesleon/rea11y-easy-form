import React from 'react';
import { render } from '@testing-library/react';
import Radio from './Radio';
import Switch, { SWITCH_TYPE } from '../Switch';
import { RadioProps } from './Radio.types';

jest.mock('../Switch', () => ({
  __esModule: true,
  ...jest.requireActual('../Switch'),
  default: jest.fn(() => null),
}));

describe('<Radio />', () => {
  let props: RadioProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Radio {...props} />);

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
    props.type = SWITCH_TYPE.CHECKBOX;
    renderComponent();
    expect(Switch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: SWITCH_TYPE.RADIO,
      }),
      expect.any(Object)
    );
  });
});
