// same as the 'is-promise' library,
// but no point adding badly named 3kb lib
// when can be done in couple hundred bytes
const isThenable = (obj: any): boolean =>
  Boolean(obj) &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';

export default isThenable;
