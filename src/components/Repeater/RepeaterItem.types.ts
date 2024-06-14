import type { HTMLAttributes, MouseEventHandler } from 'react';
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';

export interface RepeaterItemProps extends HTMLAttributes<HTMLDivElement> {
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  moveDown?: MouseEventHandler<HTMLButtonElement>;
  moveUp?: MouseEventHandler<HTMLButtonElement>;
  remove?: MouseEventHandler<HTMLButtonElement>;
  fields: FieldArrayInput<any>;
  isDragging?: boolean;
  index: number;
}
