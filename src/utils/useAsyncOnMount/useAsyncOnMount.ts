import { useAsync, useMountEffect } from '@react-hookz/web';

// used for loading peer dependencies with dynamic import
// to keep standard import out of the rollup bundle
// @todo: loading states where used?
const useAsyncOnMount = <Result, Args extends unknown[] = unknown[]>(
  fn: (...params: Args) => Promise<Result>,
  initialValue?: Result
): { loading: boolean; result: Result | undefined } => {
  const [{ result, status, error }, { execute }] = useAsync(fn, initialValue);
  useMountEffect(execute);
  if (error) throw error;
  return { result, loading: status === 'loading' };
};

export default useAsyncOnMount;
