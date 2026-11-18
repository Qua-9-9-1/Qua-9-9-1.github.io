import { useEffect, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, BallCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import type { Mesh, MeshPhysicalMaterial } from 'three';
import type { PointerEvent } from 'react';
import { ballStates } from './ballStates';

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface BallProps {
  category: string;
  label: string;
  color: string;
  radius: number;
  startPosition: [number, number, number];
  /** Visible play area: dragging is clamped to it, escaping balls respawn. */
  bounds: Bounds;
  /** Where escaped balls come back (x range at the top of the pool). */
  spawnRangeX: [number, number];
  zone: Bounds;
}

export default function ProjectTypeBall({
  category,
  label,
  color,
  radius,
  startPosition,
  bounds,
  spawnRangeX,
  zone,
}: BallProps) {
  const rigidBody = useRef<RapierRigidBody>(null);
  const textRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => () => void ballStates.delete(category), [category]);
  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    []
  );

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
    rigidBody.current?.setBodyType(2, true);
    rigidBody.current?.wakeUp();
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    document.body.style.cursor = 'grab';

    if (rigidBody.current) {
      const vel = rigidBody.current.linvel();
      rigidBody.current.setBodyType(0, true);
      rigidBody.current.setLinvel(
        { x: vel.x * 0.42, y: vel.y * 0.42, z: 0 },
        true
      );
      rigidBody.current.wakeUp();
    }
  };

  useFrame(({ pointer, size, camera }, delta) => {
    const body = rigidBody.current;
    if (!body) return;

    const pos = body.translation();
    textRef.current?.position.set(pos.x, pos.y, pos.z + radius + 0.05);

    const inside =
      pos.x > zone.minX &&
      pos.x < zone.maxX &&
      pos.y > zone.minY &&
      pos.y < zone.maxY;
    ballStates.set(category, inside);

    // Selected balls glow softly.
    const mat = materialRef.current;
    if (mat) {
      const target = inside ? 0.45 : 0;
      mat.emissiveIntensity +=
        (target - mat.emissiveIntensity) * Math.min(1, delta * 8);
    }

    if (isDragging) {
      // Pointer → world for the orthographic camera centred on 0,0. (The
      // `viewport` state was stale after the camera zoom changed, which made
      // the ball lag far behind the cursor.)
      const x = (pointer.x * size.width) / (2 * camera.zoom);
      const y = (pointer.y * size.height) / (2 * camera.zoom);
      body.setNextKinematicTranslation({
        x: Math.max(bounds.minX + radius, Math.min(bounds.maxX - radius, x)),
        y: Math.max(bounds.minY + radius, Math.min(bounds.maxY - radius, y)),
        z: 0,
      });
      return;
    }

    // Escaped (thrown hard, or the layout shrank): drop it back in the pool.
    const margin = radius * 3;
    if (
      pos.y < bounds.minY - margin ||
      pos.y > bounds.maxY + margin ||
      pos.x < bounds.minX - margin ||
      pos.x > bounds.maxX + margin ||
      Math.abs(pos.z) > 5
    ) {
      const x =
        spawnRangeX[0] + Math.random() * (spawnRangeX[1] - spawnRangeX[0]);
      body.setTranslation({ x, y: bounds.maxY - radius * 1.5, z: 0 }, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <group>
      <RigidBody
        ref={rigidBody}
        position={startPosition}
        colliders={false}
        restitution={0.35}
        friction={0.6}
        enabledTranslations={[true, true, false]}
        enabledRotations={[false, false, true]}
        ccd
        linearDamping={0.4}
        angularDamping={0.6}
      >
        <BallCollider args={[radius]} />
        <mesh
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerOver={() => {
            if (!isDragging) document.body.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            if (!isDragging) document.body.style.cursor = '';
          }}
        >
          <sphereGeometry args={[radius, 40, 40]} />
          <meshPhysicalMaterial
            ref={materialRef}
            color={color}
            emissive={color}
            emissiveIntensity={0}
            roughness={0.35}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </mesh>
      </RigidBody>

      <Text
        ref={textRef}
        position={startPosition}
        // Let clicks on the label reach the ball underneath.
        raycast={() => null}
        fontSize={radius * 0.38}
        color="#ffffff"
        fontWeight="bold"
        maxWidth={radius * 1.8}
        lineHeight={1}
        outlineWidth={radius * 0.035}
        outlineColor="#000000"
        outlineOpacity={0.45}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  );
}
