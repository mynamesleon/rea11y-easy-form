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

export default function useAnnounce(
  mode: 'off' | 'assertive' | 'polite' = 'assertive'
) {
  const nextIndex = useRef(0);
  const [announcements, setAnnouncements] = useState<(ReactNode | undefined)[]>(
    () => [...DEFAULT_ANNOUNCEMENTS]
  );

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
      const updatedIndex = (nextIndex.current + 1) % MAX_ANNOUNCEMENTS;
      const result = [...currentAnnouncements];
      result[nextIndex.current] = content;
      result[updatedIndex] = undefined;
      nextIndex.current = updatedIndex;
      return result;
    });
  }, []);

  return { announce, announcer };
}
