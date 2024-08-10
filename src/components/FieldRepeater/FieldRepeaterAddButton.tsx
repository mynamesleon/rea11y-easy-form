import React, { useEffect, useState, useCallback } from 'react';
import { useFieldRepeaterContext } from './FieldRepeaterContext';
import { focusAndSmoothlyScrollIntoView } from '../../utils';
import type { FieldArrayInput } from '../../utils/useFieldArray/useFieldArray.types';
import Button from '../Button';

const FieldRepeaterAddButton = ({
  droppableId,
  className,
  fields,
}: {
  droppableId: string;
  className: string;
  fields: FieldArrayInput<any>;
}) => {
  const {
    max,
    disabled,
    srAnnounce,
    defaultValues,
    strings: { add, srItemAdded },
  } = useFieldRepeaterContext();

  // focus newly added repeater section;
  // use `getElementById` to not interfere with droppable ref
  const [focusLastChild, setFocusLastChild] = useState(false);
  useEffect(() => {
    if (focusLastChild) {
      const toFocus =
        window.document.getElementById(droppableId)?.lastElementChild;
      focusAndSmoothlyScrollIntoView(toFocus as HTMLElement);
      setFocusLastChild(false);
    }
  }, [droppableId, focusLastChild]);

  const addItem = useCallback(() => {
    fields.push(defaultValues);
    srAnnounce(srItemAdded(fields.length + 1));
    setFocusLastChild(true);
  }, [fields, srAnnounce, srItemAdded, defaultValues]);

  if (!max || fields.length < max) {
    return (
      <Button
        text={add(fields.length)}
        aria-controls={droppableId}
        className={className}
        disabled={disabled}
        onClick={addItem}
      />
    );
  }
  return null;
};

export default FieldRepeaterAddButton;
