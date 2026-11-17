import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is in (or near) the viewport.
 * With `once`, it stays true after the first intersection (lazy mounting).
 */
export function useInView<T extends Element>({
  rootMargin = '0px',
  once = false,
}: { rootMargin?: string; once?: boolean } = {}) {
  const ref = useRef<T>(null);
  // Without IntersectionObserver support, consider everything visible.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView] as const;
}
