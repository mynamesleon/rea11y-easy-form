import clsx from 'clsx';
import React from 'react';
import FieldRepeaterItemRenderer from './FieldRepeaterItemRenderer';
import FieldRepeaterDragAndDrop from './FieldRepeaterDragDrop';
import { useFieldRepeaterContext } from './FieldRepeaterContext';
import FieldRepeaterAddButton from './FieldRepeaterAddButton';
import { useAutoId, useFieldClassName } from '../../utils';
import { FieldRepeaterContentProps } from './FieldRepeaterContent.types';
import useFieldRepeaterFieldsSetup from './useFieldRepeaterFieldsSetup';

const FieldRepeaterContent = ({
  className,
  children,
  fields,
}: FieldRepeaterContentProps) => {
  useFieldRepeaterFieldsSetup(fields);
  const classPrefix = useFieldClassName('field-repeater');
  const droppableId = useAutoId('field-repeater-droppable');
  const { disabled, dragAndDrop, Droppable } = useFieldRepeaterContext();

  return (
    <FieldRepeaterDragAndDrop fields={fields}>
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
              <FieldRepeaterItemRenderer children={children} fields={fields} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <FieldRepeaterAddButton
          className={`${classPrefix}__add`}
          droppableId={droppableId}
          fields={fields}
        />
      </div>
    </FieldRepeaterDragAndDrop>
  );
};

export default FieldRepeaterContent;
