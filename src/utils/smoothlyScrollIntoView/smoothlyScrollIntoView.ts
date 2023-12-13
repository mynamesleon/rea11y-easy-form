import isElementInViewport from '../isElementInViewport';

// check if the 'behavior' option is supported (Safari is the new IE...);
// if not, passing an options object into `scrollIntoView` could error
const IS_SCROLL_BEHAVIOUR_SUPPORTED =
  'scrollBehavior' in window.document.documentElement.style;

const SCROLL_INTO_VIEW_OPTIONS_BASE: ScrollOptions = {
  behavior: 'smooth',
};

const SCROLL_INTO_VIEW_OPTIONS_START = {
  ...SCROLL_INTO_VIEW_OPTIONS_BASE,
  inline: 'nearest',
  block: 'start',
} as const;

const SCROLL_INTO_VIEW_OPTIONS_END = {
  ...SCROLL_INTO_VIEW_OPTIONS_BASE,
  inline: 'nearest',
  block: 'end',
} as const;

const getScrollIntoViewArg = (
  startOrEnd: 'start' | 'end' = 'start'
): boolean | ScrollIntoViewOptions => {
  // use a boolean arg if 'behavior' is not supported;
  // default to true (top/start) to match default for scrollIntoView
  if (!IS_SCROLL_BEHAVIOUR_SUPPORTED) {
    return startOrEnd !== 'end';
  }
  // use options object if 'behavior' is supported
  if (startOrEnd === 'end') {
    return SCROLL_INTO_VIEW_OPTIONS_END;
  }
  return SCROLL_INTO_VIEW_OPTIONS_START;
};

/**
 * smoothly scroll element into view (using native methods)
 */
const smoothlyScrollIntoView = (element?: Element | null | undefined) => {
  if (!element) {
    return;
  }

  // check if element is in viewport, and only scroll if needed;
  // could use `.scrollIntoViewIfNeeded()` for this, but is non-standard
  // (and not currently supported in Firefox)
  const domRect = element.getBoundingClientRect?.();
  if (isElementInViewport(domRect)) {
    return;
  }

  // if the element is taller than the viewport,
  // or the top of the element is before the viewport start,
  // then scroll it to the top of the screen
  const isTallerThanViewport = domRect?.height > window.innerHeight;
  const startOrEnd = isTallerThanViewport || domRect?.top < 0 ? 'start' : 'end';
  const scrollIntoViewArg = getScrollIntoViewArg(startOrEnd);

  // optional chain call, as some environments (e.g. jsdom)
  // may not have scrollIntoView implemented
  element.scrollIntoView?.(scrollIntoViewArg);
};

export default smoothlyScrollIntoView;
