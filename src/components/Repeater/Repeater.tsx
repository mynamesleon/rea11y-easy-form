import React from 'react';
import RepeaterContent from './RepeaterContent';
import RepeaterContext from './RepeaterContext';
import { RepeaterProps } from './Repeater.types';
import './Repeater.less';

const Repeater = ({ children, className, name, ...other }: RepeaterProps) => {
  // silently handle children not being a function
  if (typeof children !== 'function' || typeof name !== 'string' || !name) {
    return null;
  }

  return (
    <RepeaterContext {...other} name={name}>
      <RepeaterContent children={children} className={className} />
    </RepeaterContext>
  );
};

// using defaultProps (instead of default params) for consistent function reference
Repeater.defaultProps = {
  addText: 'Add another entry',
  deleteText: 'Remove this entry',
  moveDownText: 'Move down',
  moveUpText: 'Move up',
  reorderText: 'Re-order',
  srItemDropped: 'You have dropped the item.',
  srItemDroppedInvalid: 'The item has been dropped while not over a drop area.',
  srCannotBeDropped: 'You are over an area that cannot be dropped on.',
  srMovementCancelled: 'Movement cancelled.',
  srUsageInstructions:
    'Press space bar to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Some screen readers may require you to be in focus mode or to use your pass through key.',
  srItemAdded: (position: string | number) =>
    `Item added at position ${position}`,
  srItemDeleted: (position: string | number) =>
    `Item at position ${position} deleted`,
  srItemLifted: (position: string | number) =>
    `You have lifted an item in position ${position}.`,
  srItemMoved: (start: string | number, end: string | number) =>
    `You have moved the item from position ${start} to position ${end}.`,
  srReturnedToStart: (position: string | number) =>
    `The item has returned to its starting position of ${position}.`,
};

export default Repeater;
