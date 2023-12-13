const ALPHA_NUMERIC_REGEX = /^[a-z0-9]+$/i;

const isAlphaNumeric = (value?: any): boolean =>
  typeof value === 'string' && ALPHA_NUMERIC_REGEX.test(value);

export default isAlphaNumeric;
