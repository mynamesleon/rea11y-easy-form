import type { ElementType } from 'react';

export interface Dictionary<T = any> {
  [x: string]: T;
}

export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type Merge<A, B> = Omit<A, keyof B> & B;
export type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

export type AsProps<
  Component extends ElementType,
  PermanentProps extends object,
  ComponentProps extends object,
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>;
