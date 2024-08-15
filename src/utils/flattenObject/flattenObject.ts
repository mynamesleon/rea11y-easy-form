import { isElement as isReactElement } from 'react-is';

type FlattenObjectOptions = {
  prefix?: string | null | undefined;
  flattenArrays?: boolean;
  flattenReactNodes?: boolean;
  flattenErrors?: boolean;
};

/**
 * flatten an object down to a single level
 */
const flattenObject = (
  obj: Object | undefined,
  { prefix, ...otherOptions }: FlattenObjectOptions = {},
  acc: Object = {}
): Object => {
  const {
    flattenArrays = false,
    flattenErrors = false,
    flattenReactNodes = false,
  } = otherOptions;
  const parentIsArray = Array.isArray(obj);

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    const prefixToUse = prefix
      ? parentIsArray
        ? `${prefix}[${key}]`
        : `${prefix}.${key}`
      : key;
    const child = obj[key];

    if (
      child !== null &&
      typeof child === 'object' &&
      ((flattenArrays && Array.isArray(child)) || !Array.isArray(child)) &&
      ((flattenReactNodes && isReactElement(child)) ||
        !isReactElement(child)) &&
      ((flattenErrors && child instanceof Error) || !(child instanceof Error))
    ) {
      flattenObject(child, { prefix: prefixToUse, ...otherOptions }, acc);
    } else {
      acc[prefixToUse] = child;
    }
  }
  return acc;
};

export default flattenObject;
