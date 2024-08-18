import React, {
  type AriaAttributes,
  type ReactNode,
  useCallback,
  useState,
  useMemo,
  useRef,
} from 'react';
import VisuallyHidden from '../../components/VisuallyHidden';
import useFieldClassName from '../useFieldClassName';
import useConstant from 'use-constant';

const useAnnounce = (
  mode: AriaAttributes['aria-live'] = 'assertive',
  maxAnnouncements: number = 5
) => {
  const nextIndex = useRef(0);
  const maxAnnouncementsConst = useConstant(() => {
    const num = parseInt(maxAnnouncements?.toString());
    return num < 1 ? 1 : num;
  });
  const [announcements, setAnnouncements] = useState<(ReactNode | undefined)[]>(
    () => new Array(maxAnnouncementsConst).fill(null)
  );
  const classPrefix = useFieldClassName('announcer');

  // NOTE: cannot use the announcement value for the `key`, even if it is a string,
  // as we may get multiple consecutive announcements with the same content;
  // index is fine here though, as the array has a fixed length
  const announcer = useMemo(
    () => (
      <VisuallyHidden className={classPrefix} as="span" data-testid="Announcer">
        {announcements.map((announcement, index) => (
          <VisuallyHidden
            className={`${classPrefix}__item`}
            aria-live={mode}
            aria-atomic
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            as="span"
          >
            {announcement || ''}
          </VisuallyHidden>
        ))}
      </VisuallyHidden>
    ),
    [announcements, classPrefix, mode]
  );

  const announce = useCallback(
    (content?: ReactNode) => {
      setAnnouncements((currentAnnouncements) => {
        // update the array for the new announcement
        const result = [...currentAnnouncements];
        result[nextIndex.current] = content;
        // empty the next announcement container so that
        // even if it is updated with the same value as before
        // it will still get announced
        // (e.g. for repeated "item deleted" announcements)
        const updatedIndex = (nextIndex.current + 1) % maxAnnouncementsConst;
        if (updatedIndex !== nextIndex.current) {
          result[updatedIndex] = undefined;
        }
        nextIndex.current = updatedIndex;
        return result;
      });
    },
    [maxAnnouncementsConst]
  );

  return { announce, announcer };
};

export default useAnnounce;
