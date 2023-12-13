const isNullOrUndefined = (arg?: any): boolean =>
  typeof arg === 'undefined' || arg === null;

export default isNullOrUndefined;
