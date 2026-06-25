import { useEffect, useRef, useState } from 'react';

export default function Background() {
  const containerRef = useRef<SVGGElement>(null);
  const [polygons, setPolygons] = useState<{ d: string }[]>([]);

  useEffect(() => {
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
    setPolygons(rawPaths.map((d) => ({ d })));
  }, []);

  useEffect(() => {
    if (!containerRef.current || polygons.length === 0) return;

    const polys = containerRef.current.querySelectorAll('.animated-poly');
    const styles: string[] = [];

    polys.forEach((poly, index) => {
      const spawnX = Math.floor(Math.random() * 800) + 50;
      const spawnY = Math.floor(Math.random() * 500) + 50;

      const moveX1 = Math.floor(Math.random() * 120) - 60;
      const moveY1 = Math.floor(Math.random() * 120) - 60;
      const moveX2 = Math.floor(Math.random() * 120) - 60;
      const moveY2 = Math.floor(Math.random() * 120) - 60;

      const duration = Math.random() * 20 + 20;
      const animationName = `dynamic-drift-${index}`;

      poly.setAttribute('transform', `translate(${spawnX} ${spawnY})`);

      styles.push(`
        @keyframes ${animationName} {
          0% { transform: translate(0px, 0px); }
          33% { transform: translate(${moveX1}px, ${moveY1}px); }
          66% { transform: translate(${moveX2}px, ${moveY2}px); }
          100% { transform: translate(0px, 0px); }
        }
        .animated-poly:nth-child(${index + 1}) path {
          animation: ${animationName} ${duration}s ease-in-out infinite;
        }
      `);
    });

    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles.join('\n');
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [polygons]);

  return (
    <svg
      id="visual"
      viewBox="0 0 900 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="fixed inset-0 w-screen h-screen -z-50 pointer-events-none select-none bg-background"
    >
      <g ref={containerRef}>
        {polygons.map((poly, index) => (
          <g key={index} className="animated-poly">
            <path
              d={poly.d}
              fill="none"
              stroke="var(--primary-main)"
              opacity="0.3"
              strokeWidth="2"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
