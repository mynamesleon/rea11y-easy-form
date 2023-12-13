import React from 'react';
import { render } from '@testing-library/react';
import Label from './Label';
import { LabelProps } from './Label.types';
import { fieldClassName } from '../../utils';

describe('<Label />', () => {
  let props: LabelProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Label {...props} />);

  it('renders children', () => {
    props.children = <div className="test" />;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component.querySelector('.test')).not.toBeNull();
  });

  it('takes a text prop', () => {
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component).toHaveTextContent(props.text as string);
  });

  it('renders a label element by default', () => {
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component.tagName).toBe('LABEL');
  });

  it('takes a component prop for the element', () => {
    props.text = 'text';
    props.component = 'div';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component.tagName).toBe('DIV');
  });

  it('renders nothing when the component prop is label, if no children or text prop has been provided', () => {
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('Label');
    expect(component).toBeNull();
  });

  it('when the `component` prop is not `label`, still renders with no child data', () => {
    props.component = 'div';
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('Label');
    expect(component).not.toBeNull();
  });

  it('should set `htmlFor` when rendering a `label`', () => {
    props.htmlFor = 'htmlFor';
    props.children = 'children';
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('Label');
    expect(component).toHaveAttribute('for', props.htmlFor);
  });

  it('should not set `htmlFor` when rendering an element that is not a `label`', () => {
    props.component = 'div';
    props.htmlFor = 'htmlFor';
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('Label');
    expect(component).not.toHaveAttribute('for');
    expect(component).not.toHaveAttribute('htmlFor');
  });

  it('takes a custom className', () => {
    props.text = 'text';
    props.className = 'label-testing';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component).toHaveClass(props.className);
  });

  it('takes a required prop and sets a className based on it', () => {
    props.text = 'text';
    props.required = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component).toHaveClass(`${fieldClassName('label')}--required`);
  });

  it('takes a required prop to render an asterisk', () => {
    props.text = 'text';
    props.required = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    const asterisk: any = component.querySelector(
      `.${fieldClassName('label')}__asterisk`
    );
    expect(asterisk).not.toBeNull();
    expect(asterisk).not.toHaveAttribute('title');
    expect(asterisk).not.toHaveAttribute('aria-label');
    expect(asterisk).toHaveTextContent('*');
  });

  it('renders the asterisk in a span if no `srRequiredText` is provided', () => {
    props.text = 'text';
    props.required = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    const asterisk: any = component.querySelector(
      `.${fieldClassName('label')}__asterisk`
    );
    expect(asterisk.tagName).toBe('SPAN');
  });

  it('takes a srRequiredText prop to render as the asterisk title and aria-label, and renders an abbr', () => {
    props.text = 'text';
    props.required = true;
    props.srRequiredText = 'required';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    const asterisk: any = component.querySelector(
      `.${fieldClassName('label')}__asterisk`
    );
    expect(asterisk.tagName).toBe('ABBR');
    expect(asterisk).toHaveAttribute('title', props.srRequiredText);
    expect(asterisk).toHaveAttribute('aria-label', props.srRequiredText);
  });

  it('will pass other props onto the element', () => {
    props.text = 'text';
    props.hidden = true;
    props['data-something'] = 'something';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Label');
    expect(component).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(component).toHaveAttribute('hidden');
  });
});
