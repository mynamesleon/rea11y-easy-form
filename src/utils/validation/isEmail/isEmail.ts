// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmail = (value?: any): boolean =>
  typeof value === 'string' && EMAIL_REGEX.test(value);

export default isEmail;
