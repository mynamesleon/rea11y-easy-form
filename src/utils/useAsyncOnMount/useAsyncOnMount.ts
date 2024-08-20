import { useAsync, useMountEffect } from '@react-hookz/web';

// used for loading peer dependencies with dynamic import
// to keep standard import out of the rollup bundle
// @note: we do NOT like this; need to investigate a better way
// for rollup to handle this, to exclude specified external deps
// from having import statements at the top of the entry bundle

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
