import { useCallback } from 'react';
import { useRepeaterContext } from './RepeaterContext';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';

const useHandleRepeaterDragEnd = (fields: FieldArrayInput<any>) => {
  const {
    strings: {
      srItemMoved,
      srItemDropped,
      srReturnedToStart,
      srMovementCancelled,
      srItemDroppedInvalid,
    },
  } = useRepeaterContext();

  const returnedToStartText = useCallback(
    (source) => srReturnedToStart(source.index + 1),
    [srReturnedToStart]
  );

  const handleDragCancel = useCallback(
    (source, announce) =>
      announce(`${srMovementCancelled()} ${returnedToStartText(source)}`),
    [returnedToStartText, srMovementCancelled]
  );

  const handleDragEndMove = useCallback(
    (source, destination, announce) => {
      const { index: start } = source;
      const { index: end } = destination;
      announce(`${srItemDropped()} ${srItemMoved(start + 1, end + 1)}`);
      return fields?.move?.(start, end);
    },
    [srItemDropped, srItemMoved, fields]
  );

  const handleDragEnd = useCallback(
    ({ source, destination, reason }, { announce }) => {
      if (reason === 'CANCEL') {
        return handleDragCancel(source, announce);
      }
      if (destination) {
        return handleDragEndMove(source, destination, announce);
      }
      announce(`${srItemDroppedInvalid()} ${returnedToStartText(source)}`);
    },
    [
      handleDragEndMove,
      handleDragCancel,
      srItemDroppedInvalid,
      returnedToStartText,
    ]
  );
  return handleDragEnd;
};

export default useHandleRepeaterDragEnd;
