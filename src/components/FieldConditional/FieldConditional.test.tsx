import React from 'react';
import { render } from '@testing-library/react';
import FieldConditional from './FieldConditional';
import type { FieldConditionalProps } from './FieldConditional.types';
import EasyForm from '../EasyForm';

describe('<FieldConditional />', () => {
  let props: FieldConditionalProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () =>
    render(
      <EasyForm
        initialValues={{
          first: 'first',
          second: 'second',
          'grand-parent': {
            child: 'child',
            parent: {
              'grand-child': ['complex', 'value', 1],
            },
          },
        }}
      >
        <FieldConditional {...props} />
      </EasyForm>
    );

  it('should render the children if no `if` or `ifNot` prop exists', () => {
    props.children = <div data-testid="children"></div>;
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('children')).toBeInTheDocument();
  });

  it('accepts a children function', () => {
    props.children = () => <div data-testid="children"></div>;
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('children')).toBeInTheDocument();
  });

  it.each([
    {
      if: {
        first: 'first',
      },
    },
    {
      // all match
      if: {
        first: 'first',
        'grand-parent.parent.grand-child': ['complex', 'value', 1],
      },
      ifNot: {
        second: 'third',
      },
    },
    {
      if: {
        first: 'second',
        second: 'third',
      },
      ifLogic: 'OR' as const,
      ifNot: {
        'grand-parent.child': 'child', // only match
        'grand-parent.parent.grand-child': 'grand-child',
      },
      ifNotLogic: 'OR' as const,
      logic: 'OR' as const,
    },
    {
      if: {
        first: (value: string) => value?.toUpperCase() === 'FIRST', // matches
        second: 'third', // does not match
      },
      ifLogic: 'OR' as const,
      // matches
      ifNot: {
        'grand-parent.child': 'not this',
        'grand-parent.parent.grand-child': 'grand child',
      },
    },
  ])('should render the children in case %#', (args: FieldConditionalProps) => {
    props = {
      children: <div data-testid="children"></div>,
      ...args,
    };
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('children')).toBeInTheDocument();
  });

  it.each([
    {
      if: {
        first: 'first', // matches
        second: 'third', // does not match
      },
    },
    {
      if: {
        first: 'first',
      },
      ifNot: {
        second: 'second',
      },
    },
    {
      if: {
        first: 'second',
        second: 'third',
      },
      ifLogic: 'OR' as const,
      ifNot: {
        'grand-parent.child': 'child',
        'grand-parent.parent.grand-child': ['complex', 'value', 1],
      },
      ifNotLogic: 'OR' as const,
      logic: 'OR' as const,
    },
  ])(
    'should not render the children in case %#',
    (args: FieldConditionalProps) => {
      props = {
        children: <div data-testid="children"></div>,
        ...args,
      };
      const { queryByTestId } = renderComponent();
      expect(queryByTestId('children')).not.toBeInTheDocument();
    }
  );
});
