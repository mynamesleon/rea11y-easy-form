import React from 'react';
import { render } from '@testing-library/react';
import CheckboxList from './CheckboxList';
import SwitchList, { SWITCH_LIST_TYPE } from '../SwitchList';
import { CheckboxListProps } from './CheckboxList.types';
import { fieldClassName } from '../../utils';

jest.mock('../SwitchList', () => ({
  __esModule: true,
  ...jest.requireActual('../SwitchList'),
  default: jest.fn(() => null),
}));

describe('<CheckboxList />', () => {
  let props: CheckboxListProps;

  beforeEach(() => {
    props = {
      name: 'checkbox-list',
    };
  });

  const renderComponent = () => render(<CheckboxList {...props} />);

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
    const classPrefix = `${fieldClassName('checkbox-list')}`;
    renderComponent();
    expect(SwitchList).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining(classPrefix),
        type: SWITCH_LIST_TYPE.CHECKBOX,
      }),
      expect.any(Object)
    );
  });
});
