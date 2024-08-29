import React from 'react';
import { render } from '@testing-library/react';
import RadioList from './RadioList';
import SwitchList, { SWITCH_LIST_TYPE } from '../SwitchList';
import { fieldClassName } from '../../utils';
import type { SwitchListProps } from '../SwitchList/SwitchList.types';

jest.mock('../SwitchList', () => ({
  __esModule: true,
  ...jest.requireActual('../SwitchList'),
  default: jest.fn(() => null),
}));

describe('<RadioList />', () => {
  let props: Omit<SwitchListProps, 'type'>;

  beforeEach(() => {
    props = {
      name: 'radio-list',
    };
  });

  const renderComponent = () => render(<RadioList {...props} />);

  it('should pass props along to the Switch component', () => {
    props['aria-hidden'] = true;
    props.onChange = jest.fn();
    renderComponent();
    expect(SwitchList).toHaveBeenCalledWith(
      expect.objectContaining(props),
      expect.any(Object)
    );
  });

  it('should pass classNames along to the SwitchList component', () => {
    props.className = 'className';
    renderComponent();
    expect(SwitchList).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining(props.className),
      }),
      expect.any(Object)
    );
  });

  it('should pass a default className and type along to the SwitchList component', () => {
    const classPrefix = `${fieldClassName('radio-list')}`;
    renderComponent();
    expect(SwitchList).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining(classPrefix),
        type: SWITCH_LIST_TYPE.RADIO,
      }),
      expect.any(Object)
    );
  });
});
