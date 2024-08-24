import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import type { ErrorMessageProps } from './ErrorMessage.types';
import { NoticeIcon, NOTICE_TYPE } from '../Notice';

jest.mock('../Notice', () => ({
  __esModule: true,
  ...jest.requireActual('../Notice'),
  NoticeIcon: jest.fn(() => null),
}));

describe('<ErrorMessage />', () => {
  let props: ErrorMessageProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<ErrorMessage {...props} />);

  it('takes a text prop', () => {
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('ErrorMessage');
    expect(component).toHaveTextContent(props.text as string);
  });

  it('takes a children prop', () => {
    props.children = <div className="test">test</div>;
    const { getByTestId } = renderComponent();
    const component = getByTestId('ErrorMessage');
    const testDiv = component.querySelector('.test');
    expect(testDiv).not.toBeNull();
    expect(testDiv).toHaveTextContent('test');
  });

  it('renders nothing if no children or text prop is provided', () => {
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('ErrorMessage');
    expect(component).toBeNull();
  });

  it('renders an error type NoticeIcon by default', () => {
    props.text = 'text';
    renderComponent();
    expect(NoticeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ type: NOTICE_TYPE.ERROR }),
      expect.any(Object) // context
    );
  });

  it('renders a loading type NoticeIcon if `loading` is true', () => {
    props.text = 'text';
    props.loading = true;
    renderComponent();
    expect(NoticeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ type: NOTICE_TYPE.ERROR, loading: true }),
      expect.any(Object) // context
    );
  });

  it('passes other props onto the element', () => {
    props.text = 'text';
    props['data-something'] = 'something';
    props.hidden = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('ErrorMessage');
    expect(component).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(component).toHaveAttribute('hidden');
  });
});
