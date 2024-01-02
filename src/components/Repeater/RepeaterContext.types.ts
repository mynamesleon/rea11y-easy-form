import type { ReactNode } from 'react';

type RepeaterRenderedTextProp = string | (() => string);
type RepeaterRenderedTextNodeProp = ReactNode | (() => ReactNode);
type RepeaterRenderedTextWithPositionProp =
  | string
  | ((position: number | string) => string);

export const REPEATER_STRINGS_KEYS = [
  'moveDownText',
  'reorderText',
  'deleteText',
  'moveUpText',
  'addText',
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

export interface RepeaterContextStrings {
  moveDownText?: RepeaterRenderedTextNodeProp;
  reorderText?: RepeaterRenderedTextNodeProp;
  deleteText?: RepeaterRenderedTextNodeProp;
  moveUpText?: RepeaterRenderedTextNodeProp;
  addText?: RepeaterRenderedTextNodeProp;
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

export interface RepeaterContextStringsFns {
  moveDownText: () => ReactNode | undefined;
  reorderText: () => ReactNode | undefined;
  deleteText: () => ReactNode | undefined;
  moveUpText: () => ReactNode | undefined;
  addText: () => ReactNode | undefined;
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

export interface RepeaterContextPropsBase {
  dragAndDrop?: boolean;
  defaultValues?: any;
  ordering?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export interface RepeaterContextProps
  extends RepeaterContextStrings,
    RepeaterContextPropsBase {
  children: ReactNode;
  name: string;
}

export interface RepeaterContextValue
  extends RepeaterContextStringsFns,
    Required<RepeaterContextPropsBase> {
  srAnnounce: (content?: ReactNode) => void;
  fields: any;
}
