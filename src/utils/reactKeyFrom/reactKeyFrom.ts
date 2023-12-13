import isNullOrUndefined from '../isNullOrUndefined';

const reactKeyFrom = (...args: any[]): string | undefined => {
  for (let i = 0, l = args.length; i < l; i += 1) {
    const arg = args[i];
    if ((typeof arg === 'string' && !arg) || isNullOrUndefined(arg)) {
      continue;
    }
    return String(arg);
  }
};

export default reactKeyFrom;
