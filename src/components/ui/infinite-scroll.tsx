import type { ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: boolean;
}  

export default function InfiniteScroll({
  children,
  speed = 'normal',
  pauseOnHover = true,
  direction = true,
}: InfiniteScrollProps) {
  const pxPerSec = speed === 'fast' ? 220 : speed === 'normal' ? 160 : 80;
  const [duration, setDuration] = useState('20s');
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const content = containerRef.current.querySelector('div');
    if (content) {
      const width = (content as HTMLElement).offsetWidth;
      const seconds = width / pxPerSec;
      setDuration(`${seconds}s`);
    }
  }, [children, speed]);

  const handleMouseOver = (e: React.MouseEvent) => {
    if (pauseOnHover) {
      let el = e.target as HTMLElement | null;
      while (el && el !== containerRef.current) {
        if (el.classList.contains('carousel-item')) {
          setPaused(true);
          break;
        }
        el = el.parentElement;
      }
    }
  };

  const handleMouseOut = () => {
    if (pauseOnHover) {
      setPaused(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (pauseOnHover) {
      let el = e.target as HTMLElement | null;
      let found = false;
      while (el && el !== containerRef.current) {
        if (el.classList.contains('carousel-item')) {
          setPaused(true);
          const idx = Array.from(
            containerRef.current?.querySelectorAll('.carousel-item') || []
          ).indexOf(el);
          setActiveIndex(idx);
          found = true;
          break;
        }
        el = el.parentElement;
      }
      if (!found) setActiveIndex(null);
    }
  };

  const handleTouchEnd = () => {
    if (pauseOnHover) {
      setPaused(false);
      setActiveIndex(null);
    }
  };

  const enhancedChildren = (
    Array.isArray(children) ? children : [children]
  ).map((child, idx) => {
    if (
      typeof child === 'object' &&
      child &&
      'props' in child &&
      child.props.className?.includes('carousel-item')
    ) {
      return {
        ...child,
        props: {
          ...child.props,
          'data-active': activeIndex === idx ? 'true' : undefined,
        },
      };
    }
    return child;
  });

  return (
    <div className="relative w-full overflow-hidden bg-background">
      <div className="absolute left-0 top-0 z-1 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-1 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      <div
        ref={containerRef}
        className={`flex w-max min-w-full gap-2`}
        style={{
          animation: `${direction ? 'scroll' : 'scroll-reverse'} ${duration} linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex shrink-0 gap-2 items-center justify-around min-w-full">
          {enhancedChildren}
        </div>
        <div
          className="flex shrink-0 gap-2 items-center justify-around min-w-full"
          aria-hidden="true"
        >
          {enhancedChildren}
        </div>
      </div>
    </div>
  );
}
