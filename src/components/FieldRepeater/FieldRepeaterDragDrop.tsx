import React, { ReactNode, useCallback } from 'react';
import { useFieldRepeaterContext } from './FieldRepeaterContext';
import useHandleFieldRepeaterDragEnd from './useHandleFieldRepeaterDragEnd';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';

const FieldRepeaterDragDrop = ({
  children,
  fields,
}: {
  children: ReactNode;
  fields: FieldArrayInput<any>;
}) => {
  const {
    DragDropContext,
    strings: {
      srItemMoved,
      srItemLifted,
      srCannotBeDropped,
      srUsageInstructions,
    },
  } = useFieldRepeaterContext();

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
  const handleDragEnd = useHandleFieldRepeaterDragEnd(fields);

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

export default FieldRepeaterDragDrop;
