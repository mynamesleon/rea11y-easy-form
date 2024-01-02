import type { HTMLAttributes, MouseEventHandler } from 'react';
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

export interface RepeaterItemProps extends HTMLAttributes<HTMLDivElement> {
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  moveDown?: MouseEventHandler<HTMLButtonElement>;
  moveUp?: MouseEventHandler<HTMLButtonElement>;
  remove?: MouseEventHandler<HTMLButtonElement>;
  isDragging?: boolean;
}
