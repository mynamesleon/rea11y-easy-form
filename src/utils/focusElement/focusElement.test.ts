import focusElement from './focusElement';

describe('focusElement', () => {
  describe('returns false if focus is not triggered', () => {
    test('does nothing if no element is provided', () => {
      const result = focusElement();
      expect(result).toBe(false);
    });

    test('does nothing if the element already has focus', () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();
      expect(button).toHaveFocus();
      const result = focusElement(button);
      expect(result).toBe(false);
    });
  });

  test('sets tabindex to -1 on elements that are not natively focusable', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    focusElement(div);
    expect(div).toHaveAttribute('tabindex', '-1');

    // const button = document.createElement('button');
    // document.body.appendChild(button);
    // focusElement(button);
    // expect(button).not.toHaveAttribute('tabindex', '-1');
  });

  test('triggers focus on the element, and returns true to indicate success', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const result = focusElement(div);
    expect(result).toBe(true);
    expect(div).toHaveFocus();
  });

  test('passes the second argument to the element focus method', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.focus = jest.fn();
    focusElement(div, { preventScroll: true });
    expect(div.focus).toHaveBeenCalledWith(
      expect.objectContaining({ preventScroll: true })
    );
  });
});
