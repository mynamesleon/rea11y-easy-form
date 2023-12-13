const isNumber = (value?: any): boolean => {
  if (typeof value === 'number') {
    return true;
  }
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export default isNumber;
