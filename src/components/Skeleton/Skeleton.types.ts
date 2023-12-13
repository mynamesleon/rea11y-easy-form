import type { ElementType, ReactNode } from 'react';
import type { Dictionary } from '../../utils/constants';

export enum SKELETON_TYPE {
  INPUT = 'input',
  TEXT = 'text',
}

export interface SkeletonProps extends Dictionary {
  /**
   * The outer element to render for the component;
   * defaults to 'div' in input mode, and 'span' in text mode
   */
  component?: ElementType;
  className?: string;
  /**
   * Content to render inside the skeleton area
   */
  children?: ReactNode;
  /**
   * Text visible to screen-reader users within the skeleton element;
   * can use this prop with a primitive value (such as a string)
   * to leverage the component's memoisation
   * @default 'loading'
   */
  text?: ReactNode;
  /**
   * @default 'input'
   */
  type?: SKELETON_TYPE;
}
