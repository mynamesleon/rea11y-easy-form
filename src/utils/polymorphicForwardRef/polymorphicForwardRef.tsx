import {
  forwardRef,
  type ForwardRefExoticComponent,
  type ForwardRefRenderFunction,
  type ComponentPropsWithRef,
  type ReactElement,
  type ElementType,
} from 'react';
import type { AsProps, Merge } from '../types';

// source: https://www.tsteele.dev/posts/react-polymorphic-forwardref

type PolymorphicWithRef<
  Default extends OnlyAs,
  Props extends object = {},
  OnlyAs extends ElementType = ElementType,
> = <T extends OnlyAs = Default>(
  props: AsProps<T, Props, ComponentPropsWithRef<T>>
) => ReactElement | null;

type PolyForwardComponent<
  Default extends OnlyAs,
  Props extends object = {},
  OnlyAs extends ElementType = ElementType,
> = Merge<
  ForwardRefExoticComponent<
    Merge<ComponentPropsWithRef<Default>, Props & { as?: Default }>
  >,
  PolymorphicWithRef<Default, Props, OnlyAs>
>;

type PolyRefFunction = <
  Default extends OnlyAs,
  Props extends object = {},
  OnlyAs extends ElementType = ElementType,
>(
  Component: ForwardRefRenderFunction<any, Props & { as?: OnlyAs }>
) => PolyForwardComponent<Default, Props, OnlyAs>;

const polymorphicForwardRef = forwardRef as PolyRefFunction;

export default polymorphicForwardRef;
