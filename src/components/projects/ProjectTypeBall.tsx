import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, BallCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { useLanguage } from '../../context/LanguageContext';
import { useIsMobile } from '../../hooks/useMediaQuery';

export const ballStates = new Map<string, boolean>();

interface BallProps {
  label: string;
  startPosition: [number, number, number];
  spawnRangeX: number[];
  resetY?: number;
  limits: { x: number; floor: number };
  zoneTarget: { x: number; y: number; width: number; height: number };
}

export default function ProjectTypeBall({
  label,
  startPosition,
  spawnRangeX,
  resetY = -10,
  limits,
  zoneTarget,
}: BallProps) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const rigidBody = useRef<RapierRigidBody>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { viewport } = useThree();
  const RADIUS = isMobile ? 0.55 : 0.85;

  const color = useMemo(
    () =>
      '#' +
      Math.floor(Math.abs(Math.sin(label.length + 10) * 16777215)).toString(16),
    [label]
  );

  const onPointerDown = (e: any) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
    rigidBody.current?.setBodyType(2, true);
    rigidBody.current?.wakeUp();
  };

  const onPointerUp = (e: any) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    setIsDragging(false);

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

  useFrame(({ pointer }) => {
    if (!rigidBody.current) return;

    const currentPos = rigidBody.current.translation();
    const minX = zoneTarget.x - zoneTarget.width / 2;
    const maxX = zoneTarget.x + zoneTarget.width / 2;
    const minY = zoneTarget.y - zoneTarget.height / 2;
    const maxY = zoneTarget.y + zoneTarget.height / 2;

    const isInsideZone =
      currentPos.x > minX &&
      currentPos.x < maxX &&
      currentPos.y > minY &&
      currentPos.y < maxY;

    ballStates.set(label, isInsideZone);

    if (isDragging) {
      let targetX = (pointer.x * viewport.width) / 2;
      let targetY = (pointer.y * viewport.height) / 2;
      const maxX = limits.x - RADIUS;
      const minFloor = limits.floor + RADIUS;

      targetX = Math.max(-maxX, Math.min(maxX, targetX));
      targetY = Math.max(minFloor, targetY);
      rigidBody.current.setNextKinematicTranslation({
        x: targetX,
        y: targetY,
        z: 0,
      });
    } else {
      if (currentPos.y < resetY || Math.abs(currentPos.x) > limits.x + 20) {
        console.log('Respawning ball:', label);
        console.log('Current Position:', currentPos);
        console.log('Limits:', limits);
        const newX =
          spawnRangeX[0] + Math.random() * (spawnRangeX[1] - spawnRangeX[0]);

        rigidBody.current.setTranslation(
          { x: newX, y: 5 + Math.random() * 5, z: 0 },
          true
        );
        rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }

      if (Math.abs(currentPos.z) > 20) {
        console.log('Resetting Z position for ball:', label);
        console.log('Current Z Position:', currentPos.z);
        rigidBody.current.setTranslation(
          { x: currentPos.x, y: currentPos.y, z: 0 },
          true
        );
      }
    }
  });

  return (
    <RigidBody
      ref={rigidBody}
      position={startPosition}
      colliders={false}
      restitution={0.2}
      friction={0.8}
      enabledTranslations={[true, true, false]}
      enabledRotations={[false, false, true]}
      ccd={true}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <BallCollider args={[RADIUS]} />
      <mesh onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <sphereGeometry args={[RADIUS, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <Text
        position={[0, 0, RADIUS + 0.05]}
        fontSize={0.3}
        color="white"
        fontWeight="bold"
        maxWidth={RADIUS * 2}
        outlineWidth={0.025}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {t.projects.categories[label as keyof typeof t.projects.categories]}
      </Text>
    </RigidBody>
  );
}
