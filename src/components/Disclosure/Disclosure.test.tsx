import React, { type ComponentProps } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Disclosure from './Disclosure';
import { fieldClassName } from '../../utils';

describe('<Disclosure />', () => {
  let props: ComponentProps<typeof Disclosure>;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Disclosure {...props} />);

  it('renders children', () => {
    props.children = <div className="test">children</div>;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    expect(component.querySelector('.test')).not.toBeNull();
  });

  it('renders children inside the content area', () => {
    props.open = false;
    props.children = 'children';
    const { getByText } = renderComponent();
    const component = getByText(props.children as string);
    expect(component).toHaveAttribute('hidden');
  });

  it('takes a children function, assing it the current `open` state', () => {
    props.open = false;
    props.children = jest.fn(() => null);
    renderComponent();
    expect(props.children).toHaveBeenCalledWith(props.open);
  });

  it('renders the outer element with the chosen component', () => {
    props.as = 'section';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    expect(component.tagName).toBe('SECTION');
  });

  it('renders the trigger as a button', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    expect(component.querySelector('button')).not.toBeNull();
  });

  it('defaults to the content area being hidden by default', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    expect(component.querySelector('[hidden]')).not.toBeNull();
  });

  it('takes a defaultOpen prop for the starting open state', () => {
    props.defaultOpen = true;
    props.children = 'children';
    const { getByText } = renderComponent();
    expect(getByText(props.children as string)).not.toHaveAttribute('hidden');
  });

  it('takes an open prop for the open state', () => {
    props.open = true;
    props.children = 'children';
    const { getByText } = renderComponent();
    expect(getByText(props.children as string)).not.toHaveAttribute('hidden');
  });

  it('takes a className prop to add to the outer element', () => {
    props.className = 'className';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    expect(component).toHaveClass(props.className);
  });

  it('changes the visible state in uncontrolled mode when the button is clicked', () => {
    props.defaultOpen = false;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    const content = component.querySelector('div');

    expect(content).toHaveAttribute('hidden');
    fireEvent.click(button as HTMLElement);
    expect(content).not.toHaveAttribute('hidden');
  });

  it('does not change the visible state in controlled mode when the button is clicked', () => {
    props.onChange = jest.fn();
    props.open = false;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    const content = component.querySelector('div');

    expect(content).toHaveAttribute('hidden');
    fireEvent.click(button as HTMLElement);
    expect(content).toHaveAttribute('hidden');
  });

  it('sets classes and an aria-expanded attribute to indicate the open state', () => {
    props.defaultOpen = false;
    const { getByTestId } = renderComponent();
    const classPrefix = fieldClassName('disclosure');
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    const content = component.querySelector('div');

    expect(component).not.toHaveClass(`${classPrefix}--open`);
    expect(content).not.toHaveClass(`${classPrefix}__content--open`);
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button as HTMLElement);
    expect(component).toHaveClass(`${classPrefix}--open`);
    expect(content).toHaveClass(`${classPrefix}__content--open`);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets ids and aria attributes to indicate relationships between the trigger and the content', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    const buttonId = button?.getAttribute('id');
    const content = component.querySelector('div');
    const contentId = content?.getAttribute('id');

    expect(content).toHaveAttribute('aria-labelledby', buttonId);
    expect(button).toHaveAttribute('aria-controls', contentId);
  });

  it('takes a title prop for the trigger content', () => {
    props.title = 'title';
    const { getByTestId, getByText } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    expect(getByText(props.title as string)).toStrictEqual(button);
  });

  it('takes a label prop for the trigger content', () => {
    props.label = 'label';
    const { getByTestId, getByText } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    expect(getByText(props.label as string)).toStrictEqual(button);
  });

  it('takes a summary prop for the trigger content', () => {
    props.summary = 'summary';
    const { getByTestId, getByText } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    expect(getByText(props.summary as string)).toStrictEqual(button);
  });

  it('takes a function prop for the summary, passing it the current open state', () => {
    props.open = false;
    props.summary = jest.fn(() => null);
    renderComponent();
    expect(props.summary).toHaveBeenCalledWith(props.open);
  });

  it('takes a disabled prop to disable the trigger', () => {
    props.disabled = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('has the trigger in an enabled state by default', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('Disclosure');
    const button = component.querySelector('button');
    expect(button).not.toHaveAttribute('disabled');
  });

  describe('onChange prop', () => {
    it('fires the onChange prop when the button is clicked', () => {
      props.onChange = jest.fn();
      const { getByTestId } = renderComponent();
      const button = getByTestId('Disclosure').querySelector('button');
      fireEvent.click(button as HTMLElement);
      expect(props.onChange).toHaveBeenCalled();
    });

    it('fires the onChange prop with a boolean and an event object', () => {
      props.onChange = jest.fn();
      const { getByTestId } = renderComponent();
      const button = getByTestId('Disclosure').querySelector('button');
      fireEvent.click(button as HTMLElement);
      expect(props.onChange).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.any(Object)
      );
    });

    it('fires the onChange prop with the opposite of the defaultOpen prop', () => {
      props.onChange = jest.fn();
      props.defaultOpen = true;
      const { getByTestId } = renderComponent();
      const button = getByTestId('Disclosure').querySelector('button');
      fireEvent.click(button as HTMLElement);
      expect(props.onChange).toHaveBeenCalledWith(
        !props.defaultOpen,
        expect.any(Object)
      );
    });

    it('fires the onChange prop with the opposite of the open prop', () => {
      props.onChange = jest.fn();
      props.open = true;
      const { getByTestId } = renderComponent();
      const button = getByTestId('Disclosure').querySelector('button');
      fireEvent.click(button as HTMLElement);
      expect(props.onChange).toHaveBeenCalledWith(
        !props.open,
        expect.any(Object)
      );
    });
  });
});
