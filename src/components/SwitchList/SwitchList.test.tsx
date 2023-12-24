import React from 'react';
import { render } from '@testing-library/react';
import SwitchList from './SwitchList';
import { SWITCH_LIST_TYPE, type SwitchListProps } from './SwitchList.types';
import useSwitchListOptions from './useSwitchListOptions';
import Fieldset from '../Fieldset';
import { fieldClassName } from '../../utils';

jest.mock('./useSwitchListOptions', () => jest.fn(() => <div>result</div>));
jest.mock('../Fieldset', () => jest.fn(({ children }) => children));

const classPrefix = fieldClassName('switch-list');

describe('<SwitchList />', () => {
  let props: SwitchListProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = {
      name: 'SwitchList',
    };
  });

  const renderComponent = () => render(<SwitchList {...props} />);

  it('passes `options`, `type`, `name`, and `disabled` to the `useSwitchListOptions` hook', () => {
    props.options = [{ label: 'test label', value: 'test-value' }, 'test'];
    props.type = SWITCH_LIST_TYPE.RADIO;
    props.name = 'some-name';
    props.disabled = false;

    renderComponent();
    expect(useSwitchListOptions).toHaveBeenCalledWith(
      expect.objectContaining(props)
    );
  });

  it('renders using the Fieldset component as the container, with a visuallyHiddenLegend by default', () => {
    renderComponent();
    expect(Fieldset).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-testid': 'SwitchList',
        visuallyHiddenLegend: true,
      }),
      expect.any(Object)
    );
  });

  it('will pass other props onto the Fieldset container', () => {
    props['data-something'] = 'something';
    props.className = 'test-class';
    props.hidden = true;
    renderComponent();
    expect(Fieldset).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining(props.className),
        'data-something': props['data-something'],
        hidden: props.hidden,
      }),
      expect.any(Object) // context
    );
  });

  it('renders an unordered list containing the options', () => {
    const { container } = renderComponent();
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(ul).toHaveClass(`${classPrefix}__list`);
  });

  it('renders nothing if `useSwitchListOptions` returns nothing', () => {
    (useSwitchListOptions as any).mockReturnValue(null);
    const { container } = renderComponent();
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });
});
