const ALPHA_REGEX = /^[a-zA-Z\s]+$/;

const isAlpha = (value?: any): boolean =>
  typeof value === 'string' && ALPHA_REGEX.test(value);

export default isAlpha;
