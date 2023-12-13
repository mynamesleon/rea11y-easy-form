import renderComponent from './renderComponent';

// tests primarily copied from react-final-form
describe('renderComponent', () => {
  it('should pass both render and children prop', () => {
    const children = 'some children';
    const render = () => {};
    const props = {
      component: () => null,
      children,
      render,
    };
    const view = renderComponent(props as any);
    expect((view as any).props).toEqual({ children, render });
  });

  it('should include children when rendering with render', () => {
    const children = 'some children';
    const render = jest.fn();
    const props = {
      children,
      render,
    };
    renderComponent(props);
    expect(render).toHaveBeenCalled();
    expect(render).toHaveBeenCalledTimes(1);
    expect(render.mock.calls[0][0].children).toBe(children);
  });

  it('should handle children being undefined when rendering with render', () => {
    const render = jest.fn();
    const props = {
      render,
    };
    renderComponent(props);
    expect(render).toHaveBeenCalled();
    expect(render).toHaveBeenCalledTimes(1);
    expect(render.mock.calls[0][0].children).toBe(undefined);
  });

  it('should render children if no render strategy is provided', () => {
    const children = 'some children';
    const props = {
      children,
    };
    const view = renderComponent(props);
    expect(view).toBe(children);
  });
});
