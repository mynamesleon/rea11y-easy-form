import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { SkeletonProps, SKELETON_TYPE } from './Skeleton.types';
import { useFieldClassName } from '../../utils';
import './Skeleton.less';

const Skeleton = forwardRef<any, SkeletonProps>(
  (
    {
      type = SKELETON_TYPE.INPUT,
      component: Component = 'span',
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
export default MemoisedSkeleton;
