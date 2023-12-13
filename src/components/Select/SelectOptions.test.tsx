import React from 'react';
import { render } from '@testing-library/react';
import SelectOptions from './SelectOptions';
import { SelectOptionsProps } from './Select.types';

describe('<SelectOptions />', () => {
  let props: SelectOptionsProps;

  beforeEach(() => {
    props = {};
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <select>
        <SelectOptions {...props} />
      </select>
    );

  it('should render nothing if not passed an options array', () => {
    const { container } = renderComponent();
    expect(container.querySelector('option')).not.toBeInTheDocument();
  });

  it('should render nothing if passed an empty array', () => {
    props.options = [];
    const { container } = renderComponent();
    expect(container.querySelector('option')).not.toBeInTheDocument();
  });

  it('should process string entries', () => {
    props.options = ['test'];
    const { container } = renderComponent();
    const option = container.querySelector('option[value="test"]');
    expect(option).toBeInTheDocument();
    expect(option).toHaveTextContent('test');
  });

  describe('option groups', () => {
    it('should render entries with children arrays as optgroup elements', () => {
      props.options = [{ children: [] }];
      const { container } = renderComponent();
      const optgroup = container.querySelector('optgroup');
      expect(optgroup).toBeInTheDocument();
    });

    it('should use the label property as the optgroup label', () => {
      props.options = [{ children: [], label: 'label' }];
      const { container } = renderComponent();
      const optgroup = container.querySelector('optgroup');
      expect(optgroup).toHaveAttribute('label', 'label');
    });

    it('should use the value property as the optgroup label if there is no label property', () => {
      props.options = [{ children: [], label: 'label' }];
      const { container } = renderComponent();
      const optgroup = container.querySelector('optgroup');
      expect(optgroup).toHaveAttribute('label', 'label');
    });

    it('should take a disabled property to disable the optgroup', () => {
      props.options = [{ children: [], label: 'label', disabled: true }];
      const { container } = renderComponent();
      const optgroup = container.querySelector('optgroup');
      expect(optgroup).toBeDisabled();
    });

    it('should be enabled by default', () => {
      props.options = [{ children: [], label: 'label' }];
      const { container } = renderComponent();
      const optgroup = container.querySelector('optgroup');
      expect(optgroup).not.toBeDisabled();
    });

    it('should render children options', () => {
      props.options = [
        { children: ['test', { label: 'test2' }], value: 'label' },
      ];
      const { container } = renderComponent();
      const optgroup = container.querySelector('optgroup');
      const options = optgroup?.querySelectorAll('option');
      expect(options).toHaveLength(2);
    });
  });

  describe('detailed options', () => {
    it('should render object entries without children arrays as options', () => {
      props.options = [{ value: 'one' }, { value: 'two' }];
      const { container } = renderComponent();
      expect(container.querySelectorAll('option')).toHaveLength(2);
    });

    it('should use the label property as the option label', () => {
      props.options = [{ label: 'label' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toHaveTextContent('label');
    });

    it('should use the value property as the option label if there is no label property', () => {
      props.options = [{ value: 'label' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toHaveTextContent('label');
    });

    it('should use the value property as the option value', () => {
      props.options = [{ value: 'value' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toHaveAttribute('value', 'value');
    });

    it('should use the label property as the option value if there is no value property', () => {
      props.options = [{ label: 'value' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toHaveAttribute('value', 'value');
    });

    it('should take a disabled property to disable the option', () => {
      props.options = [{ value: 'label', disabled: true }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toBeDisabled();
    });

    it('should be enabled by default', () => {
      props.options = [{ value: 'label' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toBeEnabled();
    });

    it('should take a selected property to mark the option as selected', () => {
      props.options = ['Please select', { value: 'label', selected: true }];
      const { container } = renderComponent();
      const select = container.querySelector('select');
      // checking that first item is the selected value
      expect(select).toHaveValue('label');
    });

    it('should not be selected by default', () => {
      props.options = ['Please select', { value: 'label' }];
      const { container } = renderComponent();
      const select = container.querySelector('select');
      // checking that first item is the selected value
      expect(select).toHaveValue('Please select');
    });

    it('allows option values that are empty strings', () => {
      props.options = [{ value: '', label: 'Please select' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toHaveValue('');
    });

    it('allows option labels that are empty strings', () => {
      props.options = [{ value: 'Please select', label: '' }];
      const { container } = renderComponent();
      const option = container.querySelector('option');
      expect(option).toHaveTextContent('');
    });
  });
});
