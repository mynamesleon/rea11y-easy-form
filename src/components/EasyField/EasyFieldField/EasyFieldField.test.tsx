import React from 'react';
import { fieldSubscriptionItems } from 'final-form';
import { render } from '@testing-library/react';
import EasyFieldField from './EasyFieldField';
import { EasyFieldFieldProps } from './EasyFieldField.types';
import ErrorMessage from '../../ErrorMessage';
import { fieldClassName, useMutatedField } from '../../../utils';

jest.mock('../../ErrorMessage', () => jest.fn());

jest.mock('../../../utils', () => ({
  __esModule: true,
  ...jest.requireActual('../../../utils'),
  // mock useAutoId for a specific error id string
  useAutoId: jest.fn(() => 'error-id'),
  useMutatedField: jest.fn(() => ({ input: {}, meta: {} })),
}));

describe('<EasyFieldField />', () => {
  let props: EasyFieldFieldProps;

  beforeEach(() => {
    props = {
      name: 'test-field',
    };
  });

  const renderComponent = () => render(<EasyFieldField {...props} />);

  it('renders children', () => {
    props.children = <div className="children">children</div>;
    const { container } = renderComponent();
    const children = container.querySelector('.children');
    expect(children).not.toBeNull();
    expect(children).toHaveTextContent('children');
  });

  it('renders children as a function', () => {
    props.children = jest.fn(() => <div />);
    renderComponent();
    expect(props.children).toHaveBeenCalled();
  });

  it('allows validateFields to be explicitly set to undefined', () => {
    props.validateFields = undefined;
    renderComponent();
    expect(useMutatedField).toHaveBeenCalledWith(
      props.name,
      expect.objectContaining({
        validateFields: undefined,
      })
    );
  });

  const excludedProps = ['className', 'children', 'name'];
  const excluded = excludedProps.join(', ');
  it(`calls useMutatedField with all props as config, except ${excluded}`, () => {
    excludedProps.forEach((prop) => (props[prop] = prop));
    props.something = 'something';
    props.validate = jest.fn();
    renderComponent();
    // positive
    expect(useMutatedField).toHaveBeenCalledWith(
      props.name,
      expect.objectContaining({
        something: props.something,
        validate: props.validate,
      })
    );
    // negative
    expect(useMutatedField).toHaveBeenCalledWith(
      props.name,
      expect.not.objectContaining(
        excludedProps.reduce(
          (acc, prop) => ({ ...acc, [prop]: props[prop] }),
          {}
        )
      )
    );
  });

  it('passes an object of needed properties to the children function', () => {
    props.children = jest.fn(() => <div />);
    renderComponent();
    expect(props.children).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.any(Object),
        meta: expect.any(Object),
      })
    );
  });

  it('passes the aria-describedby prop through to the children render function', () => {
    const key = 'aria-describedby';
    props.children = jest.fn(() => <div />);
    props[key] = key;
    renderComponent();
    expect(props.children).toHaveBeenCalledWith(
      expect.objectContaining({
        [key]: props[key],
      })
    );
  });

  // test config other than subscription - default subscription will have another test
  it('calls useMutatedField with default `parse` and `validateFields` props', () => {
    renderComponent();
    expect(useMutatedField).toHaveBeenCalledWith(
      props.name,
      expect.objectContaining({
        validateFields: expect.arrayContaining([]),
        parse: expect.any(Function),
      })
    );
  });

  describe('subscription handling for `useMutatedField()`', () => {
    test('it has default `subscription` values', () => {
      renderComponent();
      const defaults = ['value', 'error', 'touched'];
      const defaultSub = defaults.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      expect(useMutatedField).toHaveBeenCalledWith(
        props.name,
        expect.objectContaining({
          subscription: expect.objectContaining(defaultSub),
        })
      );
      // confirm that other typical field state properties are not there
      const almostAllSubs = fieldSubscriptionItems.reduce((acc, key) => {
        if (!defaults.includes(key)) {
          acc[key] = true;
        }
        return acc;
      }, {});
      expect(useMutatedField).toHaveBeenCalledWith(
        props.name,
        expect.objectContaining({
          subscription: expect.not.objectContaining(almostAllSubs),
        })
      );
    });

    test('it passes truthy `subscription` properties along', () => {
      props.subscription = {
        validating: true,
        modified: true,
        active: false,
        data: false,
      };
      renderComponent();
      expect(useMutatedField).toHaveBeenCalledWith(
        props.name,
        expect.objectContaining({
          subscription: expect.objectContaining({
            modified: true,
            validating: true,
          }),
        })
      );
      expect(useMutatedField).toHaveBeenCalledWith(
        props.name,
        expect.objectContaining({
          subscription: expect.not.objectContaining({
            data: true,
            active: true,
          }),
        })
      );
    });

    test('it passes ALL `errorLogic` properties along', () => {
      props.errorLogic = {
        validating: true,
        modified: true,
        active: false,
        data: false,
      };
      renderComponent();
      expect(useMutatedField).toHaveBeenCalledWith(
        props.name,
        expect.objectContaining({
          subscription: expect.objectContaining({
            validating: true,
            modified: true,
            active: true,
            data: true,
          }),
        })
      );
    });
  });

  describe('if the useMutatedField meta state has been touched, and has an error', () => {
    beforeEach(() => {
      (useMutatedField as any).mockReturnValue({
        input: {},
        meta: { touched: true, error: 'error string' },
      });
    });

    it('adds error class to the rendered div container', () => {
      props.children = jest.fn(() => null);
      const { getByTestId } = renderComponent();
      const component = getByTestId('EasyFieldField');
      const classPrefix = fieldClassName('easy-field-field');
      expect(component).toHaveClass(`${classPrefix}--error`);
    });

    it('passes aria-invalid as true to the children function', () => {
      props.children = jest.fn(() => null);
      renderComponent();
      expect(props.children).toHaveBeenCalledWith(
        expect.objectContaining({
          'aria-invalid': true,
        })
      );
    });

    it('adds an error id into the aria-describedby prop that is passed to the children function', () => {
      props.children = jest.fn(() => null);
      renderComponent();
      expect(props.children).toHaveBeenCalledWith(
        expect.objectContaining({
          'aria-describedby': 'error-id',
        })
      );
    });

    it('respects any existing aria-describedby attribute', () => {
      const key = 'aria-describedby';
      props.children = jest.fn(() => null);
      props[key] = key;
      renderComponent();
      expect(props.children).toHaveBeenCalledWith(
        expect.objectContaining({
          'aria-describedby': expect.stringContaining(key),
        })
      );
      expect(props.children).toHaveBeenCalledWith(
        expect.objectContaining({
          'aria-describedby': expect.stringContaining('error-id'),
        })
      );
    });

    it('renders an Error Message', () => {
      renderComponent();
      expect(ErrorMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'error-id',
          text: 'error string',
        }),
        expect.any(Object) // context
      );
    });
  });
});
