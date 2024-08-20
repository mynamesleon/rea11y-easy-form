import type { ReactNode } from 'react';
import type { FieldSubscription } from 'final-form';
import type {
  Draggable,
  Droppable,
  DragDropContext,
} from 'react-beautiful-dnd';

type FieldRepeaterRenderedTextProp = string | (() => string);
type FieldRepeaterRenderedTextNodeProp =
  | ReactNode
  | ((index: number) => ReactNode);
type FieldRepeaterRenderedTextWithPositionProp =
  | string
  | ((position: number | string) => string);

export const FIELD_REPEATER_STRINGS_KEYS = [
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

interface FieldRepeaterContextVisibleStrings {
  moveDown?: FieldRepeaterRenderedTextNodeProp;
  reorder?: FieldRepeaterRenderedTextNodeProp;
  delete?: FieldRepeaterRenderedTextNodeProp;
  moveUp?: FieldRepeaterRenderedTextNodeProp;
  add?: FieldRepeaterRenderedTextNodeProp;
}

export interface FieldRepeaterContextStrings
  extends FieldRepeaterContextVisibleStrings {
  srItemDropped?: FieldRepeaterRenderedTextProp;
  srItemDroppedInvalid?: FieldRepeaterRenderedTextProp;
  srCannotBeDropped?: FieldRepeaterRenderedTextProp;
  srMovementCancelled?: FieldRepeaterRenderedTextProp;
  srUsageInstructions?: FieldRepeaterRenderedTextProp;
  srItemAdded?: FieldRepeaterRenderedTextWithPositionProp;
  srItemDeleted?: FieldRepeaterRenderedTextWithPositionProp;
  srItemLifted?: FieldRepeaterRenderedTextWithPositionProp;
  srItemMoved?:
    | string
    | ((start: number | string, end: number | string) => string);
  srReturnedToStart?: FieldRepeaterRenderedTextWithPositionProp;
}

export interface FieldRepeaterContextSrStringsFns {
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

export interface FieldRepeaterContextStringsFns
  extends FieldRepeaterContextSrStringsFns {
  moveDown: (index: number) => ReactNode | undefined;
  reorder: (index: number) => ReactNode | undefined;
  delete: (index: number) => ReactNode | undefined;
  moveUp: (index: number) => ReactNode | undefined;
  add: (length: number) => ReactNode | undefined;
}

export interface FieldRepeaterContextPropsBase {
  dragAndDrop?: boolean;
  defaultValues?: any;
  ordering?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export interface FieldRepeaterContextProps
  extends FieldRepeaterContextPropsBase {
  strings?: FieldRepeaterContextStrings;
  subscription?: FieldSubscription;
  children: ReactNode;
}

export interface FieldRepeaterContextValue
  extends Required<FieldRepeaterContextPropsBase> {
  DragDropContext: typeof DragDropContext;
  Draggable: typeof Draggable;
  Droppable: typeof Droppable;
  srAnnounce: (content?: ReactNode) => void;
  strings: FieldRepeaterContextStringsFns;
}
