import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrthographicCamera, Text } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import ProjectTypeBall, { type Bounds } from './ProjectTypeBall';
import { ballStates } from './ballStates';
import Wall from './Wall';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryColor } from '../../data/topicCategories';

interface Props {
  technos: string[];
  onFilterChange: (technos: string[]) => void;
}

/** Visible world height. Everything else is derived from the canvas size. */
const WORLD_H = 12;
const WALL = 0.3; // visual thickness of floor / divider
const DEPTH = 2;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/* ------------------------------------------------------------------ */
/* Theme colours (CSS custom properties → hex usable by three.js)       */
/* ------------------------------------------------------------------ */

let probe: CanvasRenderingContext2D | null = null;
/** Resolves any CSS colour (oklch(), var values…) to #rrggbb. */
function cssColorToHex(css: string, fallback: string): string {
  if (!css) return fallback;
  try {
    probe ??= document
      .createElement('canvas')
      .getContext('2d', { willReadFrequently: true });
    if (!probe) return fallback;
    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = fallback;
    probe.fillStyle = css; // ignored if unparsable
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  } catch {
    return fallback;
  }
}

type SceneColors = {
  primary: string;
  secondary: string;
  foreground: string;
  muted: string;
};

function readSceneColors(): SceneColors {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    primary: cssColorToHex(v('--primary-ink'), '#3e7bfa'),
    secondary: cssColorToHex(v('--secondary-ink'), '#2f5fc4'),
    foreground: cssColorToHex(v('--foreground'), '#111111'),
    muted: cssColorToHex(v('--muted-foreground'), '#777777'),
  };
}

function useSceneColors() {
  const [colors, setColors] = useState(readSceneColors);
  useEffect(() => {
    const update = () => setColors(readSceneColors());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-bg', 'style'],
    });
    return () => observer.disconnect();
  }, []);
  return colors;
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

type Layout = {
  zoom: number;
  halfW: number;
  halfH: number;
  radius: number;
  floorTop: number;
  bounds: Bounds;
  zone: Bounds;
  pool: { minX: number; maxX: number };
};

function computeLayout(width: number, height: number, count: number): Layout {
  const zoom = height / WORLD_H;
  const halfH = WORLD_H / 2;
  const halfW = width / zoom / 2;
  const worldW = halfW * 2;
  const floorTop = -halfH + WALL;

  // The drop zone is an open-top tray against the right edge.
  const zoneW = clamp(worldW * 0.34, 4.2, 9);
  const zoneH = clamp(WORLD_H * 0.55, 4, 7);
  const zone = {
    minX: halfW - zoneW,
    maxX: halfW,
    minY: floorTop,
    maxY: floorTop + zoneH,
  };
  const pool = { minX: -halfW, maxX: zone.minX - WALL / 2 };

  // Balls shrink on narrow screens so they all fit in the pool.
  const poolW = pool.maxX - pool.minX;
  const radius = clamp(
    Math.min(worldW / 16, Math.sqrt((poolW * WORLD_H * 0.35) / (count * 4))),
    0.55,
    1
  );

  return {
    zoom,
    halfW,
    halfH,
    radius,
    floorTop,
    bounds: { minX: -halfW, maxX: halfW, minY: floorTop, maxY: halfH },
    zone,
    pool,
  };
}

/** Rounded rectangle, optionally as a frame (outline) of given thickness. */
function roundedRect(w: number, h: number, r: number, frame = 0) {
  const shape = (x: number, y: number, ww: number, hh: number, rr: number) => {
    const s = new THREE.Shape();
    s.moveTo(x + rr, y);
    s.lineTo(x + ww - rr, y);
    s.quadraticCurveTo(x + ww, y, x + ww, y + rr);
    s.lineTo(x + ww, y + hh - rr);
    s.quadraticCurveTo(x + ww, y + hh, x + ww - rr, y + hh);
    s.lineTo(x + rr, y + hh);
    s.quadraticCurveTo(x, y + hh, x, y + hh - rr);
    s.lineTo(x, y + rr);
    s.quadraticCurveTo(x, y, x + rr, y);
    return s;
  };
  const outer = shape(-w / 2, -h / 2, w, h, r);
  if (frame > 0) {
    const inner = shape(
      -w / 2 + frame,
      -h / 2 + frame,
      w - frame * 2,
      h - frame * 2,
      Math.max(0.01, r - frame)
    );
    outer.holes.push(inner);
  }
  return outer;
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

function FilterEmitter({
  onFilterChange,
}: {
  onFilterChange: (t: string[]) => void;
}) {
  const last = useRef('');
  useEffect(() => () => ballStates.clear(), []);
  useFrame(() => {
    const selected: string[] = [];
    ballStates.forEach((inside, label) => inside && selected.push(label));
    selected.sort();
    const signature = selected.join(',');
    if (signature !== last.current) {
      last.current = signature;
      onFilterChange(selected);
    }
  });
  return null;
}

function DropZone({
  zone,
  colors,
  text,
}: {
  zone: Bounds;
  colors: SceneColors;
  text: string;
}) {
  const w = zone.maxX - zone.minX;
  const h = zone.maxY - zone.minY;
  const fillRef = useRef<THREE.MeshBasicMaterial>(null);
  const frameRef = useRef<THREE.MeshBasicMaterial>(null);
  const textRef = useRef<THREE.Mesh>(null);

  const fill = useMemo(() => roundedRect(w, h, 0.45), [w, h]);
  const frame = useMemo(() => roundedRect(w, h, 0.45, 0.07), [w, h]);
  const chevron = useMemo(() => {
    const s = clamp(w / 14, 0.3, 0.55); // half width
    const t = s * 0.38; // stroke thickness
    const shape = new THREE.Shape();
    shape.moveTo(-s, s * 0.5);
    shape.lineTo(-s + t, s * 0.5 + t * 0.6);
    shape.lineTo(0, -s * 0.5 + t * 1.2);
    shape.lineTo(s - t, s * 0.5 + t * 0.6);
    shape.lineTo(s, s * 0.5);
    shape.lineTo(0, -s * 0.5);
    shape.closePath();
    return shape;
  }, [w]);

  // Highlight the tray while it holds at least one ball.
  useFrame((_, delta) => {
    let active = false;
    ballStates.forEach((inside) => (active ||= inside));
    const k = Math.min(1, delta * 6);
    if (fillRef.current)
      fillRef.current.opacity +=
        ((active ? 0.22 : 0.1) - fillRef.current.opacity) * k;
    if (frameRef.current)
      frameRef.current.opacity +=
        ((active ? 0.9 : 0.45) - frameRef.current.opacity) * k;
    // troika Text applies `fillOpacity` at render time, no re-layout needed.
    const label = textRef.current as unknown as { fillOpacity: number } | null;
    if (label)
      label.fillOpacity += ((active ? 0.3 : 0.85) - label.fillOpacity) * k;
  });

  return (
    <group position={[zone.minX + w / 2, zone.minY + h / 2, -1.2]}>
      <mesh>
        <shapeGeometry args={[fill]} />
        <meshBasicMaterial
          ref={fillRef}
          color={colors.primary}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <shapeGeometry args={[frame]} />
        <meshBasicMaterial
          ref={frameRef}
          color={colors.primary}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
      <Text
        ref={textRef}
        position={[0, h * 0.12, 0.02]}
        fontSize={clamp(w / 13, 0.32, 0.5)}
        maxWidth={w - 1.2}
        lineHeight={1.25}
        color={colors.foreground}
        fillOpacity={0.85}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        raycast={() => null}
      >
        {text}
      </Text>
      {/* Down chevron (drawn: the default font has no arrow glyph). */}
      <mesh position={[0, -h * 0.22, 0.02]}>
        <shapeGeometry args={[chevron]} />
        <meshBasicMaterial
          color={colors.primary}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene({ technos, onFilterChange }: Props) {
  const { t } = useLanguage();
  const size = useThree((s) => s.size);
  const colors = useSceneColors();

  const layout = useMemo(
    () => computeLayout(size.width, size.height, Math.max(1, technos.length)),
    [size.width, size.height, technos.length]
  );
  const { zoom, halfW, halfH, radius, floorTop, bounds, zone, pool } = layout;

  // Initial spawn: spread over the pool, two staggered rows near the top.
  // Only depends on the categories, so resizing doesn't reset the balls.
  const [spawnLayout] = useState(layout);
  const startPositions = useMemo(() => {
    const { pool: p, halfH: hh, radius: r } = spawnLayout;
    const n = technos.length;
    return technos.map((_, i) => {
      const x = p.minX + r + ((i + 0.5) / n) * (p.maxX - p.minX - r * 2);
      const y = hh - r * 1.5 - (i % 2) * r * 2.4;
      return [x, y, 0] as [number, number, number];
    });
  }, [technos, spawnLayout]);

  // Rapier fixed bodies don't move when their props change: remount the
  // walls when the layout changes.
  const wallKey = `${halfW.toFixed(2)}`;
  const spawnRangeX: [number, number] = [
    pool.minX + radius * 2,
    pool.maxX - radius * 2,
  ];

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={zoom} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#ffffff', '#55556a', 0.9]} />
      <directionalLight position={[-6, 10, 12]} intensity={1.6} />

      <DropZone
        zone={zone}
        colors={colors}
        text={t.projects.ballsInstructions}
      />

      <Physics gravity={[0, -30, 0]} timeStep={1 / 60}>
        <group key={wallKey}>
          {/* Floor (visible bar) */}
          <Wall
            position={[0, floorTop - WALL / 2, 0]}
            args={[halfW * 2, WALL, DEPTH]}
            color={colors.muted}
            opacity={0.35}
          />
          {/* Tray divider */}
          <Wall
            position={[zone.minX, zone.maxY / 2 + floorTop / 2, 0]}
            args={[WALL, zone.maxY - floorTop, DEPTH]}
            color={colors.primary}
            opacity={0.85}
          />
          {/* Invisible bounds: left, right, ceiling */}
          <Wall
            visible={false}
            position={[-halfW - 0.5, 0, 0]}
            args={[1, halfH * 4, DEPTH]}
          />
          <Wall
            visible={false}
            position={[halfW + 0.5, 0, 0]}
            args={[1, halfH * 4, DEPTH]}
          />
          <Wall
            visible={false}
            position={[0, halfH + 0.5, 0]}
            args={[halfW * 2 + 2, 1, DEPTH]}
          />
        </group>

        {technos.map((tech, index) => (
          <ProjectTypeBall
            key={tech}
            category={tech}
            label={
              t.projects.categories[
                tech as keyof typeof t.projects.categories
              ] ?? tech
            }
            color={getCategoryColor(tech)}
            radius={radius}
            startPosition={startPositions[index]}
            bounds={bounds}
            spawnRangeX={spawnRangeX}
            zone={zone}
          />
        ))}
        <FilterEmitter onFilterChange={onFilterChange} />
      </Physics>
    </>
  );
}

export default function PhysicsFilterScene({ technos, onFilterChange }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene technos={technos} onFilterChange={onFilterChange} />
      </Suspense>
    </Canvas>
  );
}
