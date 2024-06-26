import React, { useEffect, useState, useCallback } from 'react';
import { useRepeaterContext } from './RepeaterContext';
import { focusAndSmoothlyScrollIntoView } from '../../utils';
import Button from '../Button';

const RepeaterAddButton = ({
  droppableId,
  className,
  fields,
}: {
  droppableId: string;
  className: string;
  fields: any;
}) => {
  const {
    max,
    disabled,
    srAnnounce,
    defaultValues,
    strings: { add, srItemAdded },
  } = useRepeaterContext();

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

export default RepeaterAddButton;
