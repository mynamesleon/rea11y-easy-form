import React from 'react';
import { render } from '@testing-library/react';
import Fieldset from './Fieldset';
import { FieldsetProps } from './Fieldset.types';
import VisuallyHidden from '../VisuallyHidden';

jest.mock('../VisuallyHidden', () => jest.fn(() => null));

describe('<Fieldset />', () => {
  let props: FieldsetProps;

  beforeEach(() => {
    props = {};
    jest.clearAllMocks();
  });

  const renderComponent = () => render(<Fieldset {...props} />);

  it('should take a className prop', () => {
    props.className = 'test';
    const { getByTestId } = renderComponent();
    const component = getByTestId('Fieldset');
    expect(component).toHaveClass(props.className);
  });

  it('renders children', () => {
    props.children = <div className="test" />;
    const { getByTestId } = renderComponent();
    const component = getByTestId('Fieldset');
    expect(component.querySelector('.test')).not.toBeNull();
  });

  describe('legend', () => {
    it('can use a legend prop for the legend contents', () => {
      props.legend = 'legend';
      const { queryByText } = renderComponent();
      const legend = queryByText(props.legend as string);
      expect((legend as HTMLLegendElement).tagName).toBe('LEGEND');
    });

    it('can use a label prop for the legend contents', () => {
      props.label = 'label';
      const { queryByText } = renderComponent();
      const label = queryByText(props.label as string);
      expect((label as HTMLLegendElement).tagName).toBe('LEGEND');
    });

    it('can take an srOnlyLegend prop to visually hide the legend', () => {
      props.legend = 'legend';
      props.srOnlyLegend = true;
      renderComponent();
      expect(VisuallyHidden).toHaveBeenCalledWith(
        expect.objectContaining({
          component: 'legend',
          text: props.legend,
        }),
        expect.any(Object)
      );
    });

    it('can take a visuallyHiddenLegend prop as an alias for srOnlyLegend', () => {
      props.legend = 'legend';
      props.visuallyHiddenLegend = true;
      renderComponent();
      expect(VisuallyHidden).toHaveBeenCalledWith(
        expect.objectContaining({
          component: 'legend',
          text: props.legend,
        }),
        expect.any(Object)
      );
    });

    it('should take a legendClassName prop for the `legend` element', () => {
      props.legend = 'legend';
      props.legendClassName = 'test';
      const { queryByText } = renderComponent();
      const legend = queryByText(props.legend as string);
      expect(legend).toHaveClass(props.legendClassName);
    });
  });
});
