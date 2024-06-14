import React, { ReactNode, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRepeaterContext } from './RepeaterContext';
import useHandleRepeaterDragEnd from './useHandleRepeaterDragEnd';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';

const RepeaterDragDrop = ({
  children,
  fields,
}: {
  children: ReactNode;
  fields: FieldArrayInput<any>;
}) => {
  const {
    strings: {
      srItemMoved,
      srItemLifted,
      srCannotBeDropped,
      srUsageInstructions,
    },
  } = useRepeaterContext();

  // drag and drop handling functions
  // use the `announce()` provided by react-beautiful-dnd
  // rather than our own `srAnnounce()` which is used by the re-ordering buttons
  const handleDragStart = useCallback(
    ({ source: { index } }, { announce }) => announce(srItemLifted(index + 1)),
    [srItemLifted]
  );
  const handleDragUpdate = useCallback(
    ({ source, destination }, { announce }) => {
      if (destination) {
        return announce(srItemMoved(source.index + 1, destination.index + 1));
      }
      announce(srCannotBeDropped());
    },
    [srItemMoved, srCannotBeDropped]
  );
  const handleDragEnd = useHandleRepeaterDragEnd(fields);

  return (
    <DragDropContext
      dragHandleUsageInstructions={srUsageInstructions()}
      onDragUpdate={handleDragUpdate}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DragDropContext>
  );
};

export default RepeaterDragDrop;
