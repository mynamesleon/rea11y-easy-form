import React, {
  type ReactNode,
  useCallback,
  useState,
  useMemo,
  useRef,
} from 'react';
import VisuallyHidden from '../../components/VisuallyHidden';

const MAX_ANNOUNCEMENTS = 5;
const DEFAULT_ANNOUNCEMENTS = new Array(MAX_ANNOUNCEMENTS).fill(null);

const useAnnounce = (mode: 'off' | 'assertive' | 'polite' = 'assertive') => {
  const nextIndex = useRef(0);
  const [announcements, setAnnouncements] = useState<(ReactNode | undefined)[]>(
    () => [...DEFAULT_ANNOUNCEMENTS]
  );

  // NOTE: cannot use the announcement value for the `key`, even if it is a string,
  // as we may get multiple consecutive announcements with the same content;
  // index is fine here though, as the array has a fixed length
  const announcer = useMemo(
    () => (
      <>
        {announcements.map((announcement, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <VisuallyHidden aria-live={mode} aria-atomic key={index}>
            {announcement || ''}
          </VisuallyHidden>
        ))}
      </>
    ),
    [announcements, mode]
  );

  const announce = useCallback((content?: ReactNode) => {
    setAnnouncements((currentAnnouncements) => {
      // update the array for the new announcement
      const result = [...currentAnnouncements];
      result[nextIndex.current] = content;
      // empty the next announcement container so that
      // even if it is updated with the same value as before
      // it will still get announced
      // (consider repeated "item deleted" announcements)
      const updatedIndex = (nextIndex.current + 1) % MAX_ANNOUNCEMENTS;
      result[updatedIndex] = undefined;
      nextIndex.current = updatedIndex;
      return result;
    });
  }, []);

  return { announce, announcer };
};

export default useAnnounce;
