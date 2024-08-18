import clsx from 'clsx';
import React, { memo } from 'react';
import { type SkeletonProps, SKELETON_TYPE } from './Skeleton.types';
import { polymorphicForwardRef, useFieldClassName } from '../../utils';
import './Skeleton.less';

const Skeleton = polymorphicForwardRef<any, SkeletonProps>(
  (
    {
      type = SKELETON_TYPE.INPUT,
      as: Component = 'span',
      text = 'Loading...',
      className,
      children,
      ...other
    },
    ref
  ) => {
    const classPrefix = useFieldClassName('skeleton');
    return (
      <Component
        data-testid="Skeleton"
        {...other}
        ref={ref}
        className={clsx(className, classPrefix, `${classPrefix}--${type}`)}
      >
        {children || text}
      </Component>
    );
  }
);

const MemoisedSkeleton = memo(Skeleton);
MemoisedSkeleton.displayName = 'Skeleton';
export default MemoisedSkeleton as typeof Skeleton;
