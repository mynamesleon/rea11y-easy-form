import React from 'react';
import { render } from '@testing-library/react';
import ValidationSummary from './ValidationSummary';
import { ValidationSummaryProps } from './ValidationSummary.types';
import { fieldClassName } from '../../utils';
import { NOTICE_TYPE } from '../Notice';

describe('<ValidationSummary />', () => {
  let props: ValidationSummaryProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<ValidationSummary {...props} />);

  it('renders nothing if no `error` or `errors` are provided', () => {
    const { queryByTestId } = renderComponent();
    const component = queryByTestId('ValidationSummary');
    expect(component).toBeNull();
  });

  it('renders an error <Notice /> div with a default className', () => {
    props.error = 'error';
    const { getByTestId } = renderComponent();
    const component = getByTestId('ValidationSummary');
    expect(component).toHaveClass(fieldClassName('notice'));
    expect(component).toHaveClass(
      fieldClassName(`notice--${NOTICE_TYPE.ERROR}`)
    );
    expect(component).toHaveClass(fieldClassName('validation-summary'));
    expect(component.nodeName).toStrictEqual('DIV');
  });

  it('renders with a custom className if provided', () => {
    props.error = 'error';
    props.className = 'custom-classname';
    const { getByTestId } = renderComponent();
    const component = getByTestId('ValidationSummary');
    expect(component).toHaveClass(props.className);
  });

  describe('`header` prop', () => {
    it('renders a `header` string prop in a paragraph tag', () => {
      props.error = 'error';
      props.header = 'header';
      const { getByText } = renderComponent();
      const header = getByText(props.header as string);
      expect(header.nodeName).toStrictEqual('P');
    });

    it('renders a `header` ReactNode prop', () => {
      props.error = 'error';
      props.header = <div className="header">header</div>;
      const { container } = renderComponent();
      const header = container.querySelector('.header');
      expect(header).toHaveTextContent('header');
    });
  });

  describe('`footer` prop', () => {
    it('renders a `footer` string prop in a paragraph tag', () => {
      props.error = 'error';
      props.footer = 'footer';
      const { getByText } = renderComponent();
      const footer = getByText(props.footer as string);
      expect(footer.nodeName).toStrictEqual('P');
    });

    it('renders a `footer` ReactNode prop', () => {
      props.error = 'error';
      props.footer = <div className="footer">footer</div>;
      const { container } = renderComponent();
      const footer = container.querySelector('.footer');
      expect(footer).toHaveTextContent('footer');
    });
  });

  describe('`error` prop', () => {
    it('renders an `error` string prop in a paragraph tag', () => {
      props.error = 'error';
      const { getByText } = renderComponent();
      const error = getByText(props.error as string);
      expect(error.nodeName).toStrictEqual('P');
    });

    it('renders an `error` ReactNode prop', () => {
      props.error = <div className="error">error</div>;
      const { container } = renderComponent();
      const error = container.querySelector('.error');
      expect(error).toHaveTextContent('error');
    });

    it('renders an `error` prop Error constructor `message` in a paragraph tag', () => {
      props.error = new Error('error');
      const { getByText } = renderComponent();
      const error = getByText('error');
      expect(error.nodeName).toStrictEqual('P');
    });
  });

  describe('`errors` prop', () => {
    it('renders an arry of error strings in <li>s in a <ul>', () => {
      props.errors = ['error1', 'error2'];
      const { container } = renderComponent();
      const ul = container.querySelector('ul');
      expect(ul).not.toBeNull();
      expect(ul).toHaveClass(fieldClassName('validation-summary__list'));
      const lis = ul?.querySelectorAll('li');
      expect(lis).toHaveLength(props.errors.length);
      expect(lis?.[0]).toHaveClass(
        fieldClassName('validation-summary__list-item')
      );
    });

    it('renders array entries that are React nodes', () => {
      props.errors = [
        <span key="1" className="custom-span">
          error
        </span>,
      ];
      const { getByText } = renderComponent();
      const error = getByText('error');
      expect(error.nodeName).toStrictEqual('SPAN');
      expect(error.parentElement?.nodeName).toStrictEqual('LI');
    });

    it('renders the `message` property of array entries that are Error constructs', () => {
      props.errors = [new Error('custom error')];
      const { getByText } = renderComponent();
      const error = getByText('custom error');
      expect(error.nodeName).toStrictEqual('LI');
    });

    it('renders the values of deep objects', () => {
      const errors = {
        first: 'error1',
        second: 'error2',
        third: ['error3', 'error4'],
        fourth: {
          fifth: 'error5',
          sixth: [
            new Error('error6'),
            {
              seventh: <div className="test">error7</div>,
            },
          ],
        },
      };
      props.errors = errors;
      const { getByText } = renderComponent();
      Array(7)
        .fill(null)
        .forEach((_, index) => {
          expect(getByText(`error${index + 1}`)).toBeInTheDocument();
        });
      expect(getByText('error7').nodeName).toStrictEqual('DIV');
    });

    it('does not render entries that are null, undefined, empty strings, or error constructs with no message', () => {
      props.errors = ['error', '', 0, new Error('custom error'), new Error()];
      const { container } = renderComponent();
      expect(container.querySelectorAll('li')).toHaveLength(3);
    });
  });
});
