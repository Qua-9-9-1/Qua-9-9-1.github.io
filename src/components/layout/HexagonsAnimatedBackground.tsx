import { useEffect, useRef } from 'react';

interface PolygonInstance {
  anchorX: number;
  anchorY: number;
  currentX: number;
  currentY: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
  opacity: number;
  strokeWidth: number;
}

const RAW_PATHS = [
  'M0 -24.2L20.9 -12.1L20.9 12.1L0 24.2L-20.9 12.1L-20.9 -12.1Z',
  'M0 -23L19.9 -11.5L19.9 11.5L0 23L-19.9 11.5L-19.9 -11.5Z',
  'M0 -14L12.1 -7L12.1 7L0 14L-12.1 7L-12.1 -7Z',
  'M0 -17L14.7 -8.5L14.7 8.5L0 17L-14.7 8.5L-14.7 -8.5Z',
  'M0 -15L13 -7.5L13 7.5L0 15L-13 7.5L-13 -7.5Z',
  'M0 -18L15.6 -9L15.6 9L0 18L-15.6 9L-15.6 -9Z',
  'M0 -17L14.7 -8.5L14.7 8.5L0 17L-14.7 8.5L-14.7 -8.5Z',
  'M0 -19L16.5 -9.5L16.5 9.5L0 19L-16.5 9.5L-16.5 -9.5Z',
  'M0 -23L19.9 -11.5L19.9 11.5L0 23L-19.9 11.5L-19.9 -11.5Z',
  'M0 -12L10.4 -6L10.4 6L0 12L-10.4 6L-10.4 -6Z',
  'M0 -13L11.3 -6.5L11.3 6.5L0 13L-11.3 6.5L-11.3 -6.5Z',
  'M0 -20L17.3 -10L17.3 10L0 20L-17.3 10L-17.3 -10Z',
  'M0 -15L13 -7.5L13 7.5L0 15L-13 7.5L-13 -7.5Z',
  'M0 -13L11.3 -6.5L11.3 6.5L0 13L-11.3 6.5L-11.3 -6.5Z',
  'M0 -12L10.4 -6L10.4 6L0 12L-10.4 6L-10.4 -6Z',
  'M0 -18L15.6 -9L15.6 9L0 18L-15.6 9L-15.6 -9Z',
  'M0 -12L10.4 -6L10.4 6L0 12L-10.4 6L-10.4 -6Z',
  'M0 -13L11.3 -6.5L11.3 6.5L0 13L-11.3 6.5L-11.3 -6.5Z',
  'M0 -12L10.4 -6L10.4 6L0 12L-10.4 6L-10.4 -6Z',
  'M0 -20L17.3 -10L17.3 10L0 20L-17.3 10L-17.3 -10Z',
];

const REPULSION_RADIUS = 150;
const REPULSION_RADIUS_SQ = REPULSION_RADIUS * REPULSION_RADIUS;
const MAX_REPULSION_FORCE = 60;

function createPolygons(w: number, h: number): PolygonInstance[] {
  return RAW_PATHS.map(() => {
    const anchorX = Math.floor(Math.random() * Math.max(1, w - 100)) + 50;
    const anchorY = Math.floor(Math.random() * Math.max(1, h - 100)) + 50;
    return {
      anchorX,
      anchorY,
      currentX: anchorX,
      currentY: anchorY,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.005 + Math.random() * 0.01,
      driftRadius: 20 + Math.random() * 30,
      opacity: 0.2,
      strokeWidth: 2,
    };
  });
}

export default function Background() {
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const polygonsRef = useRef<PolygonInstance[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let resizeTimer = 0;
    let animationFrameId = 0;
    let running = false;

    const layout = () => {
      polygonsRef.current = createPolygons(
        window.innerWidth,
        window.innerHeight
      );
      if (reducedMotion) renderFrame(false);
    };

    const renderFrame = (animate: boolean) => {
      const mouse = mouseRef.current;
      const polys = polygonsRef.current;

      for (let i = 0; i < polys.length; i++) {
        const poly = polys[i];
        const group = groupRefs.current[i];
        const path = pathRefs.current[i];
        if (!group || !path) continue;

        if (animate) poly.driftAngle += poly.driftSpeed;
        const targetX =
          poly.anchorX + Math.cos(poly.driftAngle) * poly.driftRadius;
        const targetY =
          poly.anchorY + Math.sin(poly.driftAngle) * poly.driftRadius;

        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const distSq = dx * dx + dy * dy;

        let repulsionX = 0;
        let repulsionY = 0;
        let targetOpacity = 0.3;
        let targetStrokeWidth = 2;

        if (distSq < REPULSION_RADIUS_SQ && distSq > 0) {
          const distance = Math.sqrt(distSq);
          const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
          repulsionX = (dx / distance) * force * MAX_REPULSION_FORCE;
          repulsionY = (dy / distance) * force * MAX_REPULSION_FORCE;
          targetOpacity = 0.2 + force * 0.4;
          targetStrokeWidth = 2 + force * 2;
        }

        const ease = animate ? 0.08 : 1;
        poly.currentX += (targetX + repulsionX - poly.currentX) * ease;
        poly.currentY += (targetY + repulsionY - poly.currentY) * ease;
        poly.opacity += (targetOpacity - poly.opacity) * (animate ? 0.1 : 1);
        poly.strokeWidth +=
          (targetStrokeWidth - poly.strokeWidth) * (animate ? 0.1 : 1);

        // CSS transform → composited translate, no SVG attribute re-parse.
        group.style.transform = `translate3d(${poly.currentX.toFixed(1)}px, ${poly.currentY.toFixed(1)}px, 0)`;
        path.style.opacity = poly.opacity.toFixed(3);
        path.style.strokeWidth = poly.strokeWidth.toFixed(2);
      }
    };

    const loop = () => {
      renderFrame(true);
      animationFrameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      animationFrameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(layout, 200);
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    const handleVisibility = () => (document.hidden ? stop() : start());

    layout();
    start();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        // Soft colour glows instead of a flat tinted veil (which muddied the
        // background and lowered contrast everywhere).
        style={{
          backgroundImage:
            'radial-gradient(60rem 40rem at 0% 0%, color-mix(in oklch, var(--primary-main) 16%, transparent), transparent 70%),' +
            'radial-gradient(50rem 40rem at 100% 100%, color-mix(in oklch, var(--secondary-main) 14%, transparent), transparent 70%)',
        }}
      />
      <svg
        id="visual"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -10,
          overflow: 'visible',
          contain: 'strict',
        }}
        className="pointer-events-none select-none"
      >
        {RAW_PATHS.map((d, index) => (
          <g
            key={index}
            ref={(el) => {
              groupRefs.current[index] = el;
            }}
            style={{ transform: 'translate3d(-100px, -100px, 0)' }}
          >
            <path
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={d}
              fill="none"
              stroke="var(--primary-main)"
              style={{ opacity: 0.2 }}
              strokeWidth={2}
            />
          </g>
        ))}
      </svg>
    </>
  );
}
