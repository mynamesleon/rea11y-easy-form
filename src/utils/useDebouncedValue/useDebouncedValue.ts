import { useEffect } from 'react';
import { useDebouncedState } from '@react-hookz/web';

const useDebouncedValue = (value?: any, delay = 0) => {
  const [state, setState] = useDebouncedState(value, delay);
  useEffect(() => setState(value), [setState, value]);
  return state;
};

export default useDebouncedValue;
