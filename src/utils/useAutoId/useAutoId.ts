import { useMemo } from 'react';
import { CLASS_PREFIX } from '../constants';

const idMap = new Map();
const genId = (key: string) => {
  const prev = idMap.get(key) || 0;
  const result = prev + 1;
  idMap.set(key, result);
  return result;
};

const useAutoId = (suffix: string = 'element') =>
  useMemo(() => `${CLASS_PREFIX}__${suffix}__${genId(suffix)}`, [suffix]);

export default useAutoId;
