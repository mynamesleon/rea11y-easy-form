import React from 'react';
import { render } from '@testing-library/react';
import EasyFieldGroup from './EasyFieldGroup';
import { EasyFieldGroupProps } from './EasyFieldGroup.types';
import EasyFieldField from '../EasyFieldField';
import Label from '../../Label';
import { fieldClassName } from '../../../utils';

jest.mock('../EasyFieldField', () => jest.fn(() => null));
jest.mock('../../Label', () => jest.fn(() => null));

jest.mock('../../../utils', () => ({
  __esModule: true,
  ...jest.requireActual('../../../utils'),
  // mock useAutoId for a specific error id string
  useAutoId: jest.fn(() => 'auto-id'),
}));

describe('<EasyFieldGroup />', () => {
  let props: EasyFieldGroupProps;
  const classPrefix = fieldClassName('easy-field-group');

  beforeEach(() => {
    jest.clearAllMocks();
    props = {
      name: 'test-field',
    };
  });

  const renderComponent = () => render(<EasyFieldGroup {...props} />);

  it('takes a className', () => {
    props.className = 'className';
    const { getByTestId } = renderComponent();
    const component = getByTestId('EasyFieldGroup');
    expect(component).toHaveClass(props.className);
  });

  it('takes a type to use for a className, and passes it on to <EasyFieldField />', () => {
    props.type = 'type';
    const { getByTestId } = renderComponent();
    const component = getByTestId('EasyFieldGroup');
    expect(component).toHaveClass(`${classPrefix}--type`);
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        type: props.type,
      }),
      expect.any(Object)
    );
  });

  it('renders a description, and includes its id in the aria-describedby prop passed to <EasyFieldField />', () => {
    props.description = 'description';
    const { getByTestId } = renderComponent();
    const component = getByTestId('EasyFieldGroup');
    const description = component.querySelector(`.${classPrefix}__description`);
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(props.description as string);
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        'aria-describedby': 'auto-id',
      }),
      expect.any(Object)
    );
  });

  it('takes a helpText prop as an alias for description, and merges aria-describedby attributes', () => {
    props.helpText = <div className="helpText">helpText</div>;
    props['aria-describedby'] = 'aria-describedby';
    const { getByTestId } = renderComponent();
    const component = getByTestId('EasyFieldGroup');
    const description = component.querySelector(`.${classPrefix}__description`);
    expect(description).toBeInTheDocument();
    const helpText = description?.querySelector('.helpText');
    expect(helpText).toBeInTheDocument();
    expect(helpText).toHaveTextContent('helpText');
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        'aria-describedby': expect.stringContaining(props['aria-describedby']),
      }),
      expect.any(Object)
    );
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        'aria-describedby': expect.stringContaining('auto-id'),
      }),
      expect.any(Object)
    );
  });

  it('takes a label prop and passes it to <Label /> with a default className, along with the labelComponent, id, and required', () => {
    props.label = 'label';
    props.labelComponent = 'div';
    props.required = true;
    props.id = 'id';
    renderComponent();
    expect(Label).toHaveBeenCalledWith(
      expect.objectContaining({
        text: props.label,
        htmlFor: props.id,
        required: props.required,
        component: props.labelComponent,
        className: `${classPrefix}__label`,
      }),
      expect.any(Object)
    );
  });

  it('takes a react element as a label prop and renders it', () => {
    props.label = <div className="label">label</div>;
    const { getByTestId } = renderComponent();
    const component = getByTestId('EasyFieldGroup');
    const label = component.querySelector('.label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('label');
    // confirm the Label component was not used
    expect(Label).not.toHaveBeenCalled();
  });

  it('passes a default className to <EasyFieldField />', () => {
    renderComponent();
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        className: `${classPrefix}__field`,
      }),
      expect.any(Object)
    );
  });

  it('passes the id prop to <EasyFieldField />', () => {
    props.id = 'id';
    renderComponent();
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        id: props.id,
      }),
      expect.any(Object)
    );
  });

  it('passes a generated id to <EasyFieldField /> if an id prop was not provided', () => {
    renderComponent();
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'auto-id',
      }),
      expect.any(Object)
    );
  });

  const excludedProps = ['className', 'children', 'name'];
  const excluded = excludedProps.join(', ');
  it(`passes all props to EasyFieldField, except ${excluded}`, () => {
    excludedProps.forEach((prop) => (props[prop] = prop));
    props.something = 'something';
    props.validate = jest.fn();
    renderComponent();
    // positive
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.objectContaining({
        something: props.something,
        validate: props.validate,
        name: props.name,
      }),
      expect.any(Object)
    );
    // negative
    expect(EasyFieldField).toHaveBeenCalledWith(
      expect.not.objectContaining(
        excludedProps.reduce(
          (acc, prop) => ({ ...acc, [prop]: props[prop] }),
          {}
        )
      ),
      expect.any(Object)
    );
  });
});
