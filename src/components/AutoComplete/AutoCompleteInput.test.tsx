import React from 'react';
import { render } from '@testing-library/react';
import AutoCompleteInput from './AutoCompleteInput';
import type { AutoCompleteInputProps } from './AutoComplete.types';
import { ARIA_ATTRIBUTES } from '../../utils';

describe('<AutoCompleteInput />', () => {
  let props: AutoCompleteInputProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => {
    const { container, getByTestId, ...other } = render(
      <AutoCompleteInput {...props} />
    );
    const input = getByTestId('AutoCompleteInput');
    return { input, container, ...other };
  };

  it('calls AriaAutocomplete with the rendered input', () => {
    props.onReady = jest.fn();
    const { input } = renderComponent();
    expect(props.onReady).toHaveBeenCalled();
    expect(input).not.toBeVisible();
  });

  // how to test this without mocking!
  it.skip('destroys AriaAutocomplete on unmount', () => {
    const { unmount } = renderComponent();
    unmount();
  });

  it.each(ARIA_ATTRIBUTES)(
    'passes (and removes) aria attribute %s from the generated input',
    (attr) => {
      const testValue = 'aria-autocomplete-test-value';
      props.ariaAttributes = { [attr]: testValue };
      const { rerender, container } = renderComponent();
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

  // it("triggers the autocomplete API's `disable` method based on the `disabled` prop", () => {
  //   props.disabled = true;
  //   renderComponent();
  //   // passes in `true` to disable deletions
  //   expect(mockDisable).toHaveBeenCalledWith(true);
  // });

  // it("triggers the autocomplete API's `enable` method based on the `disabled` prop", () => {
  //   props.disabled = false;
  //   renderComponent();
  //   expect(mockEnable).toHaveBeenCalled();
  // });

  // it("triggers the autocomplete API's `disable` method on load based on selected item count and `maxItems` option", async () => {
  //   props.disabled = true;
  //   props.multiple = true;
  //   props.maxItems = 1;
  //   renderComponent();
  //   expect(mockDisable).toHaveBeenCalledWith(undefined);
  // });
});
