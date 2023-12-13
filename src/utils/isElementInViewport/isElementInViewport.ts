const isElementInViewport = (elemOrRect?: Element | DOMRect): boolean => {
  if (!elemOrRect) {
    return false;
  }
  try {
    const elementRect =
      elemOrRect instanceof window.DOMRect
        ? elemOrRect
        : elemOrRect.getBoundingClientRect();
    return (
      elementRect.top >= 0 &&
      elementRect.left >= 0 &&
      elementRect.right <= window.innerWidth &&
      elementRect.bottom <= window.innerHeight
    );
  } catch (err) {
    return false;
  }
};

export default isElementInViewport;
