const capitaliseFirstLetter = (str?: string): string => {
  if (typeof str !== 'string') {
    return '';
  }
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export default capitaliseFirstLetter;
