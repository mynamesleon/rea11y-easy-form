import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import AutoCompleteInput from './AutoCompleteInput';
import type { AutoCompleteInputProps } from './AutoComplete.types';
import { ARIA_ATTRIBUTES } from '../../utils';

describe('<AutoCompleteInput />', () => {
  let props: AutoCompleteInputProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = async () => {
    const { container, findByTestId, ...other } = render(
      <AutoCompleteInput {...props} />
    );
    const input = await findByTestId('AutoCompleteInput');
    return { input, container, ...other };
  };

  it('calls AriaAutocomplete with the rendered input', async () => {
    props.onReady = jest.fn();
    const { input } = await renderComponent();
    expect(props.onReady).toHaveBeenCalled();
    expect(input).not.toBeVisible();
  });

  it.each(ARIA_ATTRIBUTES)(
    'passes (and removes) aria attribute %s from the generated input',
    async (attr) => {
      const testValue = 'aria-autocomplete-test-value';
      props.ariaAttributes = { [attr]: testValue };
      const { rerender, container } = await renderComponent();
      expect(
        container.querySelector('.aria-autocomplete__input')
      ).toHaveAttribute(attr, expect.stringContaining(testValue));

      props.ariaAttributes = { [attr]: undefined };
      rerender(<AutoCompleteInput {...props} />);
      expect(
        container.querySelector('.aria-autocomplete__input')
      ).not.toHaveAttribute(attr);
    }
  );

  it('disables the autocomplete based on the `disabled` prop', async () => {
    props.disabled = true;
    props.multiple = true;
    props.defaultValue = 'apple';
    props.source = ['apple', 'orange'];
    const { container } = await renderComponent();
    expect(container.querySelector('.aria-autocomplete__input')).toBeDisabled();
    // confirm the selected item is disabled too
    const selected = container.querySelector('.aria-autocomplete__selected');
    expect(selected).toHaveClass('aria-autocomplete__selected--disabled');
    // we will also confirm that the selected element
    // is still in the DOM after being clicked
    fireEvent.click(selected as HTMLElement);
    expect(selected).toBeInTheDocument();
  });

  it('soft disables the autocomplete on load based on selected item count and `maxItems` option', async () => {
    props.maxItems = 1;
    props.multiple = true;
    props.defaultValue = 'apple';
    props.source = ['apple', 'orange'];
    const { container } = await renderComponent();
    const generatedInput = container.querySelector('.aria-autocomplete__input');
    expect(generatedInput).toBeDisabled();
    // confirm the selected item is NOT disabled
    const selected = container.querySelector('.aria-autocomplete__selected');
    expect(selected).not.toHaveClass('aria-autocomplete__selected--disabled');
    // confirm that clicking the selected item deletes it, and re-enables the input
    fireEvent.click(selected as HTMLElement);
    expect(
      container.querySelector('.aria-autocomplete__selected')
    ).not.toBeInTheDocument();
    expect(generatedInput).toBeEnabled();
  });
});
