import { isTabbable } from 'tabbable';
import type { MutableRefObject } from 'react';

const focusElement = (
  elementOrRef?: MutableRefObject<any> | HTMLElement | null | undefined,
  focusOptions?: FocusOptions
): boolean => {
  const element = (elementOrRef as any)?.current || elementOrRef;
  if (
    typeof element?.focus === 'function' &&
    element.ownerDocument?.activeElement !== element
  ) {
    // make element focusable if not natively focusable
    if (!isTabbable(element)) {
      element.setAttribute('tabindex', '-1');
    }
    element.focus(focusOptions);
    return true;
  }
  return false;
};

export default focusElement;
