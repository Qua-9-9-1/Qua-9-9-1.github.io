import React, { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: boolean;
  itemGapPx?: number;
}

export default function InfiniteScroll({
  children,
  speed = 'normal',
  pauseOnHover = true,
  direction = true,
  itemGapPx = 0,
}: InfiniteScrollProps) {
  const pxPerSec = speed === 'fast' ? 160 : speed === 'normal' ? 100 : 80;
  const [duration, setDuration] = useState('20s');
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure the track with a ResizeObserver: no forced layout on every render,
  // and the speed is corrected once lazy images have loaded.
  useEffect(() => {
    const content = containerRef.current?.firstElementChild as
      | HTMLElement
      | null
      | undefined;
    if (!content) return;

    const update = (width: number) => {
      if (width > 0) setDuration(`${(width / pxPerSec).toFixed(2)}s`);
    };
    update(content.offsetWidth);

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) =>
      update(entry.contentRect.width)
    );
    observer.observe(content);
    return () => observer.disconnect();
  }, [pxPerSec]);

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

  const childArray = Array.isArray(children) ? children : [children];
  type AnyProps = {
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  };
  const enhancedChildren = childArray.map((child, idx) => {
    if (React.isValidElement<AnyProps>(child)) {
      const className = child.props?.className as string | undefined;
      if (className?.includes('carousel-item')) {
        const mergedStyle: React.CSSProperties = {
          ...(child.props.style as React.CSSProperties | undefined),
          marginRight: itemGapPx,
        };
        return React.cloneElement(child, {
          ...child.props,
          ['data-active']: activeIndex === idx ? 'true' : undefined,
          style: mergedStyle,
        } as AnyProps);
      }
    }
    return child;
  });

  return (
    <div className="relative w-full overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        ref={containerRef}
        className={`flex w-max min-w-full`}
        style={{
          animationName: 'scroll',
          animationDuration: duration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction ? 'normal' : 'reverse',
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex shrink-0 items-center flex-nowrap gap-0 min-w-max">
          {enhancedChildren}
        </div>
        <div
          className="flex shrink-0 items-center flex-nowrap gap-0 min-w-max"
          aria-hidden="true"
        >
          {enhancedChildren}
        </div>
      </div>
    </div>
  );
}
