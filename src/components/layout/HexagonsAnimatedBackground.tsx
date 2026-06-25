import { useEffect, useRef, useState } from 'react';

interface PolygonInstance {
  d: string;
  anchorX: number;
  anchorY: number;
  currentX: number;
  currentY: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
  opacity: number;
}

export default function Background() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<SVGGElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const polygonsRef = useRef<PolygonInstance[]>([]);

  const rawPaths = [
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

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ width: w, height: h });

      polygonsRef.current = rawPaths.map((d) => {
        const anchorX = Math.floor(Math.random() * (w - 100)) + 50;
        const anchorY = Math.floor(Math.random() * (h - 100)) + 50;
        return {
          d,
          anchorX,
          anchorY,
          currentX: anchorX,
          currentY: anchorY,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.005 + Math.random() * 0.01,
          driftRadius: 20 + Math.random() * 30,
          opacity: 0.3,
        };
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const nodes = containerRef.current.children;
      const mouse = mouseRef.current;

      const repulsionRadius = 150;
      const maxRepulsionForce = 60;

      polygonsRef.current.forEach((poly, index) => {
        const node = nodes[index] as SVGElement;
        const pathNode = node?.querySelector('path');
        if (!node || !pathNode) return;

        poly.driftAngle += poly.driftSpeed;
        const driftX = Math.cos(poly.driftAngle) * poly.driftRadius;
        const driftY = Math.sin(poly.driftAngle) * poly.driftRadius;

        const targetX = poly.anchorX + driftX;
        const targetY = poly.anchorY + driftY;

        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let repulsionX = 0;
        let repulsionY = 0;
        let targetOpacity = 0.3;

        if (distance < repulsionRadius) {
          const force = (repulsionRadius - distance) / repulsionRadius;

          repulsionX = (dx / distance) * force * maxRepulsionForce;
          repulsionY = (dy / distance) * force * maxRepulsionForce;
          targetOpacity = 0.3 + force * 0.3;
        }

        const finalTargetX = targetX + repulsionX;
        const finalTargetY = targetY + repulsionY;

        poly.currentX += (finalTargetX - poly.currentX) * 0.08;
        poly.currentY += (finalTargetY - poly.currentY) * 0.08;
        poly.opacity += (targetOpacity - poly.opacity) * 0.1;

        node.setAttribute(
          'transform',
          `translate(${poly.currentX} ${poly.currentY})`
        );
        pathNode.style.opacity = poly.opacity.toString();
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <svg
      ref={svgRef}
      id="visual"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        zIndex: -10,
      }}
      className="pointer-events-none select-none bg-background"
    >
      <g ref={containerRef}>
        {rawPaths.map((d, index) => (
          <g key={index}>
            <path
              d={d}
              fill="none"
              className="duration-200"
              stroke="var(--primary-main)"
              strokeWidth="2"
              style={{ opacity: 0.2 }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
