import React from 'react';
import Skeleton from './Skeleton';
import { SkeletonProps, SKELETON_TYPE } from './Skeleton.types';

// temp work-around for doc-gen index type issue;
// see: https://github.com/storybookjs/storybook/issues/15334

export const StandardUsage = (props: SkeletonProps) => <Skeleton {...props} />;

/**
 * A basic input / text skeleton element to indicate a loading state.
 *
 * The animation only applies if the browser has no preference set for reduced motion,
 * and it is limited to only running for 30 seconds in order to prevent
 * an unnecessary CPU hit if multiple of them are left on a page.
 */
export default {
  title: 'Components/Skeleton',
  component: StandardUsage,
};

export const TextType = (props: SkeletonProps) => <Skeleton {...props} />;
TextType.args = {
  type: SKELETON_TYPE.TEXT,
};
