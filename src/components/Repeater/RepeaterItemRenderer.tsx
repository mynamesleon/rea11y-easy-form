import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import RepeaterItem from './RepeaterItem';
import { useRepeaterContext } from './RepeaterContext';
import type { RepeaterItemRendererProps } from './RepeaterItemRenderer.types';

const RepeaterItemRenderer = ({ children }: RepeaterItemRendererProps) => {
  const {
    fields,
    disabled,
    srAnnounce,
    dragAndDrop,
    srItemMoved,
    srItemDeleted,
  } = useRepeaterContext();

  // move button functions
  const handleMoveOffset = useCallback(
    (currentIndex: number, offset: number) => {
      fields.swap(currentIndex, currentIndex + offset);
      const announce = srItemMoved(currentIndex + 1, currentIndex + offset + 1);
      srAnnounce(announce);
    },
    [fields, srItemMoved, srAnnounce]
  );
  const handleMoveUp = useCallback(
    (cur: number) => handleMoveOffset(cur, -1),
    [handleMoveOffset]
  );
  const handleMoveDown = useCallback(
    (cur: number) => handleMoveOffset(cur, 1),
    [handleMoveOffset]
  );

  const removeItem = useCallback(
    (index: number) => {
      fields.remove(index);
      srAnnounce(srItemDeleted(index + 1));
    },
    [fields, srAnnounce, srItemDeleted]
  );

  return fields.map((name: string, index: number) => {
    const isLastItem = index === fields.length - 1;
    const itemProps = {
      moveDown: isLastItem ? undefined : () => handleMoveDown(index),
      moveUp: index === 0 ? undefined : () => handleMoveUp(index),
      remove: () => removeItem(index),
      tabIndex: isLastItem ? -1 : undefined,
      children: children({
        length: fields.length,
        index,
        name,
      }),
    };

    if (disabled || fields.length === 1 || !dragAndDrop) {
      return <RepeaterItem {...itemProps} key={name || index} />;
    }

    return (
      <Draggable key={name || index} draggableId={name} index={index}>
        {(provided, snapshot) => (
          <RepeaterItem
            {...provided.draggableProps}
            {...itemProps}
            dragHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
          />
        )}
      </Draggable>
    );
  });
};

export default RepeaterItemRenderer;
