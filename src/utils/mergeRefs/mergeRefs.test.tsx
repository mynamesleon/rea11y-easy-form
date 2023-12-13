import React from 'react';
import { render } from '@testing-library/react';
import mergeRefs from './mergeRefs';

const INTERNAL_REF_VALUE = 'refValue';
const DummyComponent = React.forwardRef((_, ref) => {
  React.useImperativeHandle(ref, () => INTERNAL_REF_VALUE);
  return null;
});

test('mergeRefs', () => {
  const refAsFunc = jest.fn();
  const refAsObj = { current: undefined };
  const ExampleComponent = ({ visible }: { visible: boolean }) => {
    return visible ? (
      <DummyComponent ref={mergeRefs([refAsObj, refAsFunc])} />
    ) : null;
  };

  const { rerender } = render(<ExampleComponent visible />);
  expect(refAsFunc).toHaveBeenCalledTimes(1);
  expect(refAsFunc).toHaveBeenCalledWith(INTERNAL_REF_VALUE);
  expect(refAsObj.current).toBe(INTERNAL_REF_VALUE);
  rerender(<ExampleComponent visible={false} />);
  expect(refAsFunc).toHaveBeenCalledTimes(2);
  expect(refAsFunc).toHaveBeenCalledWith(null);
  expect(refAsObj.current).toBe(null);
});
