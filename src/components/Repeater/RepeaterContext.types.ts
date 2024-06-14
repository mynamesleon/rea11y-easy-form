import type { ReactNode } from 'react';
import type { FieldSubscription } from 'final-form';

type RepeaterRenderedTextProp = string | (() => string);
type RepeaterRenderedTextNodeProp = ReactNode | ((index: number) => ReactNode);
type RepeaterRenderedTextWithPositionProp =
  | string
  | ((position: number | string) => string);

export const REPEATER_STRINGS_KEYS = [
  'moveDown',
  'reorder',
  'delete',
  'moveUp',
  'add',
  'srItemDropped',
  'srItemDroppedInvalid',
  'srCannotBeDropped',
  'srMovementCancelled',
  'srUsageInstructions',
  'srItemAdded',
  'srItemDeleted',
  'srItemLifted',
  'srItemMoved',
  'srReturnedToStart',
];

interface RepeaterContextVisibleStrings {
  moveDown?: RepeaterRenderedTextNodeProp;
  reorder?: RepeaterRenderedTextNodeProp;
  delete?: RepeaterRenderedTextNodeProp;
  moveUp?: RepeaterRenderedTextNodeProp;
  add?: RepeaterRenderedTextNodeProp;
}

export interface RepeaterContextStrings extends RepeaterContextVisibleStrings {
  srItemDropped?: RepeaterRenderedTextProp;
  srItemDroppedInvalid?: RepeaterRenderedTextProp;
  srCannotBeDropped?: RepeaterRenderedTextProp;
  srMovementCancelled?: RepeaterRenderedTextProp;
  srUsageInstructions?: RepeaterRenderedTextProp;
  srItemAdded?: RepeaterRenderedTextWithPositionProp;
  srItemDeleted?: RepeaterRenderedTextWithPositionProp;
  srItemLifted?: RepeaterRenderedTextWithPositionProp;
  srItemMoved?:
    | string
    | ((start: number | string, end: number | string) => string);
  srReturnedToStart?: RepeaterRenderedTextWithPositionProp;
}

export interface RepeaterContextSrStringsFns {
  srItemDropped: () => string | undefined;
  srItemDroppedInvalid: () => string | undefined;
  srCannotBeDropped: () => string | undefined;
  srMovementCancelled: () => string | undefined;
  srUsageInstructions: () => string | undefined;
  srItemAdded: (position: number | string) => string | undefined;
  srItemDeleted: (position: number | string) => string | undefined;
  srItemLifted: (position: number | string) => string | undefined;
  srItemMoved: (
    start: number | string,
    end: number | string
  ) => string | undefined;
  srReturnedToStart: (position: number | string) => string | undefined;
}

export interface RepeaterContextStringsFns extends RepeaterContextSrStringsFns {
  moveDown: (index: number) => ReactNode | undefined;
  reorder: (index: number) => ReactNode | undefined;
  delete: (index: number) => ReactNode | undefined;
  moveUp: (index: number) => ReactNode | undefined;
  add: (length: number) => ReactNode | undefined;
}

export interface RepeaterContextPropsBase {
  dragAndDrop?: boolean;
  defaultValues?: any;
  ordering?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export interface RepeaterContextProps extends RepeaterContextPropsBase {
  strings?: RepeaterContextStrings;
  subscription?: FieldSubscription;
  children: ReactNode;
}

export interface RepeaterContextValue
  extends Required<RepeaterContextPropsBase> {
  srAnnounce: (content?: ReactNode) => void;
  strings: RepeaterContextStringsFns;
}
