import * as React from 'react';
import { render } from '@testing-library/react';
import VisuallyHidden from './VisuallyHidden';
import { VisuallyHiddenProps } from './VisuallyHidden.types';

describe('<VisuallyHidden />', () => {
  let props: VisuallyHiddenProps;

  beforeEach(() => {
    props = {
      children: 'test',
    };
  });

  const renderComponent = () => render(<VisuallyHidden {...props} />);

  it('renders children', () => {
    props.children = <div className="test">test</div>;
    const { container } = renderComponent();
    expect(container.querySelector('.test')).not.toBeNull();
  });

  it('renders a text prop', () => {
    props.children = null;
    props.text = 'text';
    const { getByText } = renderComponent();
    expect(getByText(props.text as string)).not.toBeNull();
  });

  it('prioritises children over text', () => {
    props.children = 'children';
    props.text = 'text';
    const { queryByText, getByText } = renderComponent();
    expect(getByText(props.children as string)).not.toBeNull();
    expect(queryByText(props.text as string)).toBeNull();
  });

  it('takes a `component` prop to render as any HTML element', () => {
    const hiddenMessage = 'Hidden Message';
    props.children = hiddenMessage;
    props.as = 'div';
    const { getByText } = renderComponent();
    const visuallyHidden = getByText(hiddenMessage);
    expect(visuallyHidden.tagName).toBe('DIV');
  });

  it('takes a `className` prop to add to the element', () => {
    props.className = 'test';
    const { container } = renderComponent();
    expect(container.querySelector('.test')).not.toBeNull();
  });

  describe('`focusable` prop', () => {
    const className = 'easy-form-visually-hidden';
    const focusableClassName = `${className}--focusable`;

    it('does not set the focusable className if the prop is not present', () => {
      const { getByTestId } = renderComponent();
      const component = getByTestId('VisuallyHidden');
      expect(component).not.toHaveClass(focusableClassName);
    });

    it('sets the focusable className if the prop is present', () => {
      props.focusable = true;
      const { getByTestId } = renderComponent();
      const component = getByTestId('VisuallyHidden');
      expect(component).toHaveClass(focusableClassName);
    });
  });
});
