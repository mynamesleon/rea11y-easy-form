import focusElement from '../focusElement';
import smoothlyScrollIntoView from '../smoothlyScrollIntoView';

import type { MutableRefObject } from 'react';

const triggerFocus = (element?: HTMLElement | null | undefined) => {
  if (typeof element?.focus !== 'function') {
    return;
  }
  // focus element and indicate not to immediately scroll;
  // note: `preventScroll` is not recognised by in some browsers,
  // (there are open bugs for this with Chromium and Mozilla)
  focusElement(element, { preventScroll: true });
  smoothlyScrollIntoView(element);
};

const focusAndSmoothlyScrollIntoView = (
  elementOrRef?: MutableRefObject<any> | HTMLElement | null | undefined,
  immediately: boolean = false
) => {
  if (immediately) {
    return triggerFocus((elementOrRef as any)?.current || elementOrRef);
  }
  requestAnimationFrame(() =>
    triggerFocus((elementOrRef as any)?.current || elementOrRef)
  );
};

export default focusAndSmoothlyScrollIntoView;
