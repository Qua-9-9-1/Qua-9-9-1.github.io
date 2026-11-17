import { useCallback, useSyncExternalStore } from 'react';

// A single shared resize listener for every subscriber instead of one per
// component. React only re-renders a component when its snapshot changes,
// i.e. when the breakpoint is actually crossed.
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener('resize', notify);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('resize', notify);
  };
}

/**
 * Returns true when the viewport is narrower than `breakpoint`.
 * The correct value is available on the very first render (no desktop→mobile
 * layout flash), unlike a useState(false) + useEffect approach.
 */
export function useIsMobile(breakpoint = 900) {
  const getSnapshot = useCallback(
    () => window.innerWidth < breakpoint,
    [breakpoint]
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
