import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import Model3D from './3DModel';
import Shape3D from './3DShape';
import Psychic_Cube3D from './Psychic_Cube';

type ModelProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  wireframe?: boolean;
};

type ShapeProps = {
  type?: 'sphere' | 'cube' | 'cone' | 'cylinder' | 'torus' | 'pyramid';
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  color?: string;
  wireframe?: boolean;
  size?: number;
  textureUrl?: string;
};

type Scene3DProps = {
  models?: ModelProps[];
  shapes?: ShapeProps[];
  psychicCubes?: ShapeProps[];
  cursor?: boolean;
  debug?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
  fov?: number;
  cameraPosition?: [number, number, number];
};

function CameraController({
  autoRotate = false,
  rotationSpeed = 0.5,
  target = [0, 0, 0] as [number, number, number],
}) {
  const controlsRef = useRef<any>(null);

  useFrame((state) => {
    if (autoRotate && controlsRef.current) {
      const time = state.clock.getElapsedTime();
      const radius = 5;
      const x = Math.sin(time * rotationSpeed) * radius;
      const z = Math.cos(time * rotationSpeed) * radius;

      state.camera.position.x = x;
      state.camera.position.z = z;
      state.camera.lookAt(target[0], target[1], target[2]);
    }
  });

  return <OrbitControls ref={controlsRef} enableRotate={!autoRotate} />;
}

export default function Scene3D({
  models,
  shapes,
  psychicCubes,
  cursor = false,
  debug = false,
  autoRotate = true,
  rotationSpeed = 0.5,
  fov = 55,
  cameraPosition = [0, 0, 5],
}: Scene3DProps) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{
        position: cameraPosition,
        fov: fov,
        near: 0.1,
        far: 1000,
      }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[2, 2, 2]} />
      {models?.map((props, i) => (
        <Model3D key={i} {...props} />
      ))}
      {shapes?.map((props, i) => (
        <Shape3D key={`shape-${i}`} {...props} />
      ))}
      {psychicCubes?.map((props, i) => (
        <Psychic_Cube3D key={`psychic-cube-${i}`} {...props} />
      ))}

      {debug && <axesHelper args={[100]} />}
      {cursor ? (
        <CameraController
          autoRotate={autoRotate}
          rotationSpeed={rotationSpeed}
        />
      ) : (
        autoRotate && (
          <CameraController autoRotate rotationSpeed={rotationSpeed} />
        )
      )}
    </Canvas>
  );
}
