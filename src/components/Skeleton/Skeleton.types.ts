import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export enum SKELETON_TYPE {
  INPUT = 'input',
  TEXT = 'text',
}

export type SkeletonProps = {
  /**
   * The outer element to render for the component
   * @default 'span'
   */
  as?: ElementType;
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
  type?: SKELETON_TYPE | String;
} & ComponentPropsWithRef<'span'>;
