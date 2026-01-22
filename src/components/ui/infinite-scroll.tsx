import React, { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  direction?: boolean;
  itemGapPx?: number; // spacing between items in pixels
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

  const childArray = Array.isArray(children) ? children : [children];
  type AnyProps = {
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
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
    <div className="relative w-full overflow-hidden bg-background select-none">
      <div className="absolute left-0 top-0 z-1 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-1 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
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
