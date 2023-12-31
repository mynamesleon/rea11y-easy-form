import type { ReactNode } from 'react';

type RepeaterItemRendererChildrenArg = {
  length: number;
  index: number;
  name: string;
};

export interface RepeaterItemRendererProps {
  children: (arg: RepeaterItemRendererChildrenArg) => ReactNode;
}
