import clsx from 'clsx';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import RepeaterItemRenderer from './RepeaterItemRenderer';
import RepeaterDragAndDrop from './RepeaterDragDrop';
import { useRepeaterContext } from './RepeaterContext';
import RepeaterAddButton from './RepeaterAddButton';
import { useAutoId, useFieldClassName } from '../../utils';
import { RepeaterContentProps } from './RepeaterContent.types';
import useRepeaterFieldsSetup from './useRepeaterFieldsSetup';

const RepeaterContent = ({
  className,
  children,
  fields,
}: RepeaterContentProps) => {
  useRepeaterFieldsSetup(fields);
  const classPrefix = useFieldClassName('repeater');
  const droppableId = useAutoId('repeater-droppable');
  const { disabled, dragAndDrop } = useRepeaterContext();

  return (
    <RepeaterDragAndDrop fields={fields}>
      <div className={clsx(className, classPrefix)}>
        <Droppable
          isDropDisabled={disabled || !dragAndDrop}
          droppableId={droppableId}
        >
          {(provided, snapshot) => (
            <div
              id={droppableId}
              className={clsx(
                `${classPrefix}__droppable`,
                snapshot.isDraggingOver && `${classPrefix}__droppable--dragging`
              )}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <RepeaterItemRenderer children={children} fields={fields} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <RepeaterAddButton
          className={`${classPrefix}__add`}
          droppableId={droppableId}
          fields={fields}
        />
      </div>
    </RepeaterDragAndDrop>
  );
};

export default RepeaterContent;
