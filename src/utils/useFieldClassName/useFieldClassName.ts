import { useMemo } from 'react';
import fieldClassName from '../fieldClassName';

const useFieldClassName = (suffix?: string) =>
  useMemo(() => fieldClassName(suffix), [suffix]);

export default useFieldClassName;
