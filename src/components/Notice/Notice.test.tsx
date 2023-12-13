import React from 'react';
import { render } from '@testing-library/react';
import Notice from './Notice';
import { NoticeProps, NOTICE_TYPE } from './Notice.types';
import { fieldClassName } from '../../utils';

describe('<Notice />', () => {
  let props: NoticeProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Notice {...props} />);

  it('takes a text prop', () => {
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    expect(component).toHaveTextContent(props.text as string);
  });

  it('takes a children prop', () => {
    props.children = <div className="test">test</div>;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    const testDiv = component.querySelector('.test');
    expect(testDiv).not.toBeNull();
    expect(testDiv).toHaveTextContent('test');
  });

  it('renders nothing if no children or text prop is provided', () => {
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('Notice');
    expect(component).toBeNull();
  });

  it('passes other props onto the element', () => {
    props.text = 'text';
    props['data-something'] = 'something';
    props.hidden = true;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    expect(component).toHaveAttribute(
      'data-something',
      props['data-something']
    );
    expect(component).toHaveAttribute('hidden');
  });

  const classPrefix = fieldClassName('notice');
  it.each(
    Object.values(NOTICE_TYPE).reduce(
      (acc: NOTICE_TYPE[][], e: NOTICE_TYPE) => {
        acc.push([e]);
        return acc;
      },
      []
    )
  )('sets a className for type %s', (type) => {
    props.type = type;
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    expect(component).toHaveClass(`${classPrefix}--${type}`);
  });

  it.each(
    Object.values(NOTICE_TYPE).reduce(
      (acc: NOTICE_TYPE[][], e: NOTICE_TYPE) => {
        acc.push([e]);
        return acc;
      },
      []
    )
  )('sets a className for variant %s', (variant) => {
    props.variant = variant;
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    expect(component).toHaveClass(`${classPrefix}--${variant}`);
  });

  it(`sets the type to ${NOTICE_TYPE.INFO} by default`, () => {
    props.text = 'text';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    expect(component).toHaveClass(`${classPrefix}--${NOTICE_TYPE.INFO}`);
  });

  it(`sets the type to ${NOTICE_TYPE.INFO} if an invalid type is used`, () => {
    props.text = 'text';
    props.type = 'something-invalid' as any;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Notice');
    expect(component).toHaveClass(`${classPrefix}--${NOTICE_TYPE.INFO}`);
  });
});
