const INTEGER_REGEX = /^[-+]?\d+$/;

const isInteger = (value?: any): boolean => {
  if (typeof value === 'number') {
    return Number.isInteger(value);
  }
  if (typeof value === 'string') {
    return INTEGER_REGEX.test(value);
  }
  return false;
};

export default isInteger;
