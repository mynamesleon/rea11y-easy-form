const isEmpty = (value?: any): boolean => {
  if (typeof value === 'undefined' || value === null) {
    return true;
  }
  // consider empty white-space as still empty
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  // treat `false` as empty (e.g. for checkboxes)
  if (typeof value === 'boolean') {
    return value === false;
  }
  // object handling...
  if (typeof value === 'object') {
    // check for array contents, rather than just existence
    if (Array.isArray(value)) {
      return !value.length;
    }
    // using `for` loop for performance so that we can exit the loop immediately
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  // if none of the above cases match, assume not empty just in case
  // so that other validation rules can be run against the value
  return false;
};

export default isEmpty;
