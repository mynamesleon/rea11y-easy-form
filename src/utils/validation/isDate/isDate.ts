import isNullOrUndefined from '../../isNullOrUndefined';

const INVALID_DATE_REGEX = /Invalid|NaN/i;

const isDate = (value?: any): boolean => {
  if (isNullOrUndefined(value)) {
    return false;
  }
  const dateObj = typeof value === 'string' ? new Date(value) : value;
  // have to resort to full `toString` check here instead of instanceOf
  // due to false positives in multi-frame DOM environments
  if (Object.prototype.toString.call(dateObj) !== '[object Date]') {
    return false;
  }
  return !INVALID_DATE_REGEX.test(dateObj.toString());
};

export default isDate;
