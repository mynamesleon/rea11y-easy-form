import React from 'react';
import { render } from '@testing-library/react';
import AsHtml from './AsHtml';
import { AsHtmlProps } from './AsHtml.types';
import { fieldClassName } from '../../utils';

describe('<AsHtml />', () => {
  let props: AsHtmlProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<AsHtml {...props} />);

  it('renders nothing if value, or children, or html have not been provided', () => {
    const { container } = renderComponent();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders valid react elements unaltered', () => {
    props.children = (
      <div className="element" data-testid="element">
        element
      </div>
    );
    const { getByTestId, container } = renderComponent();
    const element = getByTestId('element');
    expect(element).toHaveTextContent('element');
    // also check that an element with the html class is not rendered
    const htmlElem = container.querySelector(`.${fieldClassName('html')}`);
    expect(htmlElem).toBeNull();
  });

  const dangerous =
    "<p style='display:inline'>para</p><script>alert('test')</script><style>p{color:pink}</style>";

  it('can render html without sanitizing', async () => {
    props.value = dangerous;
    props.sanitize = false;
    const { container } = renderComponent();
    expect(container.querySelector('script')).not.toBeNull();
  });

  it('renders sanitized html by default', async () => {
    props.value = dangerous;
    const { container } = renderComponent();
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('style')).toBeNull();
    expect(container.querySelector('p')?.getAttribute('style')).toBeNull();
  });

  it('renders nothing if the sanitized html is empty', async () => {
    props.value = "<script>alert('test')</script>";
    const { container } = renderComponent();
    const element = container.querySelector(`.${fieldClassName('html')}`);
    return expect(element).toBeNull();
  });
});
