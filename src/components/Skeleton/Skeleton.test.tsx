import React, { type ComponentProps } from 'react';
import { render } from '@testing-library/react';
import Skeleton from './Skeleton';
import { SKELETON_TYPE } from './Skeleton.types';

describe('<Skeleton />', () => {
  let props: ComponentProps<typeof Skeleton>;

  beforeEach(() => {
    props = {
      text: 'text',
    };
  });

  const renderComponent = () => render(<Skeleton {...props} />);

  it('takes a `text` prop to render screen-reader text', () => {
    const { getByText } = renderComponent();
    expect(getByText(props.text as string)).not.toBeNull();
  });

  it('renders default loading text if no text prop is provided', () => {
    props.text = undefined;
    const { getByText } = renderComponent();
    expect(getByText('Loading...')).not.toBeNull();
  });

  it('takes a `className` prop', () => {
    props.className = 'test-class';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Skeleton');
    expect(component).toHaveClass(props.className);
  });

  it('renders as a span for the text type', () => {
    props.type = SKELETON_TYPE.TEXT;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Skeleton');
    expect(component.tagName).toBe('SPAN');
  });

  it('renders as the chosen component', () => {
    props.as = 'section';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Skeleton');
    expect(component.tagName).toBe('SECTION');
  });

  it('will pass other props onto the element', () => {
    props['data-something'] = 'something';
    props.hidden = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Skeleton');
    expect(component).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(component).toHaveAttribute('hidden');
  });
});
