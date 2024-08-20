import React, { useCallback } from 'react';
import FieldRepeaterItem from './FieldRepeaterItem';
import { useFieldRepeaterContext } from './FieldRepeaterContext';
import type { FieldRepeaterItemRendererProps } from './FieldRepeaterItemRenderer.types';
import { FIELD_REPEATER_ENTRY_KEY } from '../../utils';

const FieldRepeaterItemRenderer = ({
  children,
  fields,
}: FieldRepeaterItemRendererProps) => {
  const {
    Draggable,
    disabled,
    srAnnounce,
    dragAndDrop,
    strings: { srItemMoved, srItemDeleted },
  } = useFieldRepeaterContext();

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
    const isLastItem = index === (fields.length as number) - 1;
    const itemProps = {
      moveDown: isLastItem ? undefined : () => handleMoveDown(index),
      moveUp: index === 0 ? undefined : () => handleMoveUp(index),
      remove: () => removeItem(index),
      tabIndex: isLastItem ? -1 : undefined,
      children: children({
        length: fields.length || 0,
        index,
        name,
      }),
      fields,
      index,
    };

    // @note: FIELD_REPEATER_ENTRY_KEY values will only be
    // auto-removed when submitting using an <EasyForm>
    const currentValue = fields?.value?.[index];
    const key =
      currentValue?.[FIELD_REPEATER_ENTRY_KEY] ||
      currentValue?.key ||
      name ||
      index;
    if (disabled || fields.length === 1 || !dragAndDrop) {
      return <FieldRepeaterItem {...itemProps} key={key} />;
    }

    return (
      <Draggable draggableId={key} index={index} key={key}>
        {(provided, snapshot) => (
          <FieldRepeaterItem
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

export default FieldRepeaterItemRenderer;
