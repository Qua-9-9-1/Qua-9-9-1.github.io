import { Canvas, useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrthographicCamera, Environment } from '@react-three/drei';
import ProjectTypeBall, { ballStates } from './ProjectTypeBall';
import Wall from './Wall';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  technos: string[];
  onFilterChange: (technos: string[]) => void;
}

export const FILTER_ZONE = {
  x: 6,
  y: 0,
  width: 8,
  height: 6,
};

function SceneManager({
  onFilterChange,
}: {
  onFilterChange: (t: string[]) => void;
}) {
  const lastEmittedRef = useRef<string>('');

  useFrame((state) => {
    if (state.clock.elapsedTime % 0.2 < 0.016) return;

    const selected: string[] = [];
    ballStates.forEach((isInB, label) => {
      if (isInB) selected.push(label);
    });

    selected.sort();
    const signature = selected.join(',');
    if (signature !== lastEmittedRef.current) {
      lastEmittedRef.current = signature;
      onFilterChange(selected);
    }
  });

  return null;
}

export default function PhysicsFilterScene({ technos, onFilterChange }: Props) {
    const lastTechnosRef = useRef<string[]>([]);
    useEffect(() => {
      if (
        lastTechnosRef.current.length !== technos.length ||
        lastTechnosRef.current.some((t, i) => t !== technos[i])
      ) {
        console.log('[PhysicsFilterScene] Changement dans la liste technos:', technos);
        lastTechnosRef.current = [...technos];
      }
    }, [technos]);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const zoom = isMobile ? 22 : 35;
  const widthX = isMobile ? 5.5 : 12.5;
  const floorWidth = widthX * 2 + 4;
  const floorY = -6;
  // const spawnRangeX = isMobile ? [-4, -1] : [-10, -2];
  const zoneConfig = isMobile
    ? { ...FILTER_ZONE, x: 0, y: -2, width: 6, height: 4 }
    : FILTER_ZONE;
  const secondaryColor = "#3b82f6";

  const filterZoneWalls: React.ReactNode = isMobile ? (
    <>
    <Wall
      position={[zoneConfig.x - zoneConfig.width / 2, zoneConfig.y, 0]}
      args={[0.5, zoneConfig.height, 2]}
      opacity={0.3}
    />
    <Wall
      position={[zoneConfig.x + zoneConfig.width / 2, zoneConfig.y, 0]}
      args={[0.5, zoneConfig.height, 2]}
      opacity={0.3}
    />
    <Wall
      position={[zoneConfig.x, zoneConfig.y + zoneConfig.height / 2, 0]}
      args={[zoneConfig.width, 0.5, 2]}
      opacity={0.3}
    />
    <Wall
      position={[zoneConfig.x, zoneConfig.y - zoneConfig.height / 2, 0]}
      args={[zoneConfig.width, 0.5, 2]}
      opacity={0.3}
    />
    </>
  ) : (
    <>
    <Wall
      position={[zoneConfig.x - zoneConfig.width / 2, zoneConfig.y, 0]}
      args={[0.5, zoneConfig.height, 2]}
      opacity={0.3}
    />
    <Wall
      position={[zoneConfig.x + zoneConfig.width / 2, zoneConfig.y, 0]}
      args={[0.5, zoneConfig.height, 2]}
      opacity={0.3}
    />
    <Wall
      position={[zoneConfig.x, zoneConfig.y + zoneConfig.height / 2, 0]}
      args={[zoneConfig.width, 0.5, 2]}
      opacity={0.3}
    />
    <Wall
      position={[zoneConfig.x, zoneConfig.y - zoneConfig.height / 2, 0]}
      args={[zoneConfig.width, 0.5, 2]}
      opacity={0.3}
    />
      </>
  )

  return (
    <Canvas dpr={[1, 2]}>
      <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={zoom} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="park" />
      <group position={[zoneConfig.x, zoneConfig.y, -0.5]}>
        <mesh>
          <planeGeometry args={[zoneConfig.width, zoneConfig.height]} />
          <meshBasicMaterial
            color={secondaryColor}
            transparent
            opacity={0.2}
          />
        </mesh>

        <Text
          fontSize={0.4}
          color="white"
          textAlign="center"
          maxWidth={zoneConfig.width - 1}
          anchorX="center"
          anchorY="middle"
        >
          {t.projects.ballsInstructions}
        </Text>
      </group>

      <Physics gravity={[0, -50, 0]} timeStep={1 / 60}>
        <Wall
          position={[0, -6, 0]}
          args={[26, 1, 2]}
          opacity={0.8}
          color="#475569"
        />
        <Wall
          position={[0, floorY, 0]}
          args={[floorWidth, 1, 2]}
          opacity={0.8}
          color="#475569"
        />
        <Wall position={[-widthX, 2, 0]} args={[1, 17, 2]} opacity={0.5} />
        <Wall position={[widthX, 2, 0]} args={[1, 17, 2]} opacity={0.5} />
        {filterZoneWalls}
        <Wall
          position={[0, 0, -1.5]}
          args={[floorWidth, 20, 0.5]}
          opacity={0.2}
          color="#1e293b"
        />
        <Wall
          position={[0, 0, 1.5]}
          args={[floorWidth, 20, 0.5]}
          opacity={0.1}
          color="#f1f5f9"
        />

        {technos.map((tech, index) => (
          <ProjectTypeBall
            key={tech}
            label={tech}
            startPosition={[-6 + Math.random() * 4, 5 + index * 2, 0]}
            spawnRangeX={[-8, -2]}
            resetY={-10}
            limits={{ x: 12.5, floor: -6 }}
            zoneTarget={zoneConfig}
          />
        ))}
        <SceneManager onFilterChange={onFilterChange} />
      </Physics>
    </Canvas>
  );
}