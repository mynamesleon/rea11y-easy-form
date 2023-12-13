import React from 'react';
import { render } from '@testing-library/react';
import Select from './Select';
import { SelectProps } from './Select.types';
import SelectOptions from './SelectOptions';

// mock the core options handling, as there are separate tests for this
jest.mock('./SelectOptions', () => jest.fn(() => null));

describe('<Select />', () => {
  let props: SelectProps;

  beforeEach(() => {
    props = {};
    jest.clearAllMocks();
  });

  const renderComponent = () => render(<Select {...props} />);

  it('should pass the options prop to `SelectOptions`', () => {
    props.options = [];
    renderComponent();
    expect(SelectOptions).toHaveBeenCalledWith(
      expect.objectContaining({ options: props.options }),
      expect.any(Object)
    );
  });

  // it('should render children if `SelectOptions` returns null', () => {
  //   (SelectOptions as any).mockReturnValue(null);
  //   props.options = [];
  //   props.children = <option value="children">child</option>;
  //   const { container } = renderComponent();
  //   const options = container.querySelectorAll('option');
  //   expect(options).toHaveLength(1);
  //   expect(options[0]).toHaveTextContent('child');
  //   expect(options[0]).toHaveAttribute('value', 'children');
  // });

  // it('should render the result of `SelectOptions` if it returns something', () => {
  //   (SelectOptions as any).mockReturnValue([
  //     <option value="option" key="option">
  //       option
  //     </option>,
  //   ]);
  //   props.children = <option value="children">child</option>;
  //   const { container } = renderComponent();
  //   const options = container.querySelectorAll('option');
  //   // check for the result of SelectOptions;
  //   // children should not render
  //   expect(options).toHaveLength(1);
  //   expect(options[0]).toHaveTextContent('option');
  //   expect(options[0]).toHaveAttribute('value', 'option');
  // });

  it('should take a className prop', () => {
    props.className = 'className';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Select');
    expect(component).toHaveClass(props.className);
  });

  it('should pass all other props onto the element', () => {
    props['data-something'] = 'something';
    props.hidden = true;
    props.id = 'id';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Select');
    expect(component).toHaveAttribute('hidden');
    expect(component).toHaveAttribute('id', 'id');
    expect(component).toHaveAttribute(
      'data-something',
      props['data-something']
    );
  });
});
