import React, { ReactNode, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRepeaterContext } from './RepeaterContext';
import useHandleRepeaterDragEnd from './useHandleRepeaterDragEnd';

const RepeaterDragDrop = ({ children }: { children: ReactNode }) => {
  const { srItemLifted, srItemMoved, srCannotBeDropped, srUsageInstructions } =
    useRepeaterContext();

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
  const handleDragEnd = useHandleRepeaterDragEnd();

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
