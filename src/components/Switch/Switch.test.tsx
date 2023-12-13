/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Switch from './Switch';
import { SwitchProps, SWITCH_TYPE } from './Switch.types';
import { fieldClassName } from '../../utils';

const classPrefix = fieldClassName('switch');
const clearDom = () => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
};

describe('Switch component', () => {
  let props: SwitchProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Switch {...props} />);

  it('takes a className prop', () => {
    props.className = 'className';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Switch');
    expect(component).toHaveClass(props.className);
  });

  it('changes the checked state in uncontrolled mode when the input is toggled', () => {
    // check each possible switch type
    Object.values(SWITCH_TYPE).forEach((type) => {
      const props = { type, defaultChecked: false };
      const { getByTestId } = render(<Switch {...props} />);
      const component = getByTestId('Switch');
      const input = component.querySelector('input');
      expect(input).not.toBeChecked();

      fireEvent.click(input as HTMLInputElement);

      expect(input).toBeChecked();
      clearDom();
    });
  });

  it('does not change the visible state in controlled mode when the input is toggled', () => {
    // check each possible switch type
    Object.values(SWITCH_TYPE).forEach((type) => {
      const props = { type, checked: false };
      const { getByTestId } = render(<Switch {...props} />);
      const component = getByTestId('Switch');
      const input = component.querySelector('input');
      expect(input).not.toBeChecked();

      fireEvent.change(input as HTMLInputElement);

      expect(input).not.toBeChecked();
      clearDom();
    });
  });

  it('renders a `tick` element when in a checked state', () => {
    const tickSelector = `.${classPrefix}__tick`;
    // check controlled and uncontrolled mode
    ['checked', 'defaultChecked'].forEach((prop) => {
      // check positive and negative scenarios
      [true, false].forEach((propState) => {
        // check each possible switch type
        Object.values(SWITCH_TYPE).forEach((type) => {
          const props = { type, [prop]: propState };
          const { getByTestId } = render(<Switch {...props} />);
          const component = getByTestId('Switch');
          const tick = component.querySelector(tickSelector);
          if (propState) {
            expect(tick).not.toBeNull();
          } else {
            expect(tick).toBeNull();
          }
          clearDom();
        });
      });
    });
  });

  describe('type prop', () => {
    it('sets a class on the outer element for each available type', () => {
      Object.values(SWITCH_TYPE).forEach((type) => {
        const { getByTestId } = render(<Switch type={type} />);
        const component = getByTestId('Switch');
        expect(component).toHaveClass(`${classPrefix}--${type}`);
        clearDom();
      });
    });

    it(`renders a ${SWITCH_TYPE.CHECKBOX} input for the ${SWITCH_TYPE.CHECKBOX} type`, () => {
      props.type = SWITCH_TYPE.CHECKBOX;
      const { getByTestId } = renderComponent();
      const component = getByTestId('Switch');
      expect(component.querySelector(`[type='${props.type}']`)).not.toBeNull();
    });

    it(`renders a ${SWITCH_TYPE.RADIO} input for the ${SWITCH_TYPE.RADIO} type`, () => {
      props.type = SWITCH_TYPE.RADIO;
      const { getByTestId } = renderComponent();
      const component = getByTestId('Switch');
      expect(component.querySelector(`[type='${props.type}']`)).not.toBeNull();
    });

    it(`renders a ${SWITCH_TYPE.CHECKBOX} input for the ${SWITCH_TYPE.SWITCH} type`, () => {
      props.type = SWITCH_TYPE.SWITCH;
      const { getByTestId } = renderComponent();
      const component = getByTestId('Switch');
      expect(
        component.querySelector(`[type='${SWITCH_TYPE.CHECKBOX}']`)
      ).not.toBeNull();
    });
  });

  it('fires the correct event props when each event occurs', () => {
    const capitalise = (event: string) =>
      event.replace(/^\w/, (c) => c.toUpperCase());
    const events = ['change', 'focus', 'blur'];
    const props = events.reduce((acc, event) => {
      acc[`on${capitalise(event)}`] = jest.fn();
      return acc;
    }, {});

    const { getByTestId } = render(<Switch {...props} />);
    const component = getByTestId('Switch');
    const input = component.querySelector('input');

    events.forEach((event) => {
      // handle fireEvent.change issue
      const eventToUse = event === 'change' ? 'click' : event;
      fireEvent[eventToUse](input as HTMLInputElement);
      // @todo: make argument assertion here more precise
      expect(props[`on${capitalise(event)}`]).toHaveBeenCalledWith(
        expect.any(Object)
      );
    });
  });

  it('sets a class on the containing element when the input receives focus', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('Switch');
    const input = component.querySelector('input');
    fireEvent.focus(input as HTMLInputElement);
    expect(component).toHaveClass(`${classPrefix}--focus`);
  });

  it('takes a disabled prop to disable the input, and sets a class on the outer element based on it', () => {
    const disabledClass = `${classPrefix}--disabled`;
    [true, false].forEach((bool) => {
      Object.values(SWITCH_TYPE).forEach((type) => {
        const { getByTestId } = render(<Switch type={type} disabled={bool} />);
        const component = getByTestId('Switch');
        const input = component.querySelector('input');
        if (bool) {
          expect(component).toHaveClass(disabledClass);
          expect(input).toBeDisabled();
          expect(input).toHaveAttribute('tabindex', '-1');
        } else {
          expect(component).not.toHaveClass(disabledClass);
          expect(input).not.toBeDisabled();
        }
        clearDom();
      });
    });
  });

  it('takes a tabIndex prop to set on the input', () => {
    props.tabIndex = 4;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Switch');
    const input = component.querySelector('input');
    expect(input).toHaveAttribute('tabindex', '4');
  });
});
