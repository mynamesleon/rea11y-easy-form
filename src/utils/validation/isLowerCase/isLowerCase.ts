const isLowerCase = (value?: any): boolean =>
  typeof value === 'string' && value.toLowerCase() === value;

export default isLowerCase;
