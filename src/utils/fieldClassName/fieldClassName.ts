import { CLASS_PREFIX } from '../constants';
export const fieldClassName = (suffix?: string) =>
  `${CLASS_PREFIX}${suffix ? `-${suffix.toLowerCase()}` : ''}`;

export default fieldClassName;
