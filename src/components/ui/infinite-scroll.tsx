import type { ReactNode } from 'react';

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
  const duration =
    speed === 'fast' ? '20s' : speed === 'normal' ? '20s' : '40s';

  return (
    <div className="relative w-full overflow-hidden bg-background">
      <div className="absolute left-0 top-0 z-1 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-1 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      <div
        className={`flex w-max min-w-full gap-2 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${direction ? 'scroll' : 'scroll-reverse'} ${duration} linear infinite`,
        }}
      >
        <div className="flex shrink-0 gap-2 items-center justify-around min-w-full">
          {children}
        </div>
        <div
          className="flex shrink-0 gap-2 items-center justify-around min-w-full"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
