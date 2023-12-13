const isUpperCase = (value?: any): boolean =>
  typeof value === 'string' && value.toUpperCase() === value;

export default isUpperCase;
