import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model3D from './3DModel';
import Shape3D from './3DShape';

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
  fragmentShaderUrl?: string;
  vertexShaderUrl?: string;
};

export type Scene3DProps = {
  models?: ModelProps[];
  shapes?: ShapeProps[];
  cursor?: boolean;
  debug?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
  fov?: number;
  cameraPosition?: [number, number, number];
  /** 'always' = animated, 'demand' = render only when needed, 'never' = paused */
  frameloop?: 'always' | 'demand' | 'never';
};

const TARGET: [number, number, number] = [0, 0, 0];

function CameraController({
  autoRotate = false,
  rotationSpeed = 0.5,
  enableControls = false,
}) {
  useFrame((state) => {
    if (autoRotate && !enableControls) {
      const time = state.clock.getElapsedTime();
      const radius = 5;
      state.camera.position.x = Math.sin(time * rotationSpeed) * radius;
      state.camera.position.z = Math.cos(time * rotationSpeed) * radius;
      state.camera.lookAt(TARGET[0], TARGET[1], TARGET[2]);
    }
  });

  if (enableControls) {
    return <OrbitControls enableRotate={!autoRotate} />;
  }
  return null;
}

export default function Scene3D({
  models,
  shapes,
  cursor = false,
  debug = false,
  autoRotate = false,
  rotationSpeed = 0.5,
  fov = 55,
  cameraPosition = [0, 0, 5],
  frameloop = 'always',
}: Scene3DProps) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      frameloop={frameloop}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: true }}
      camera={{
        position: cameraPosition,
        fov: fov,
        near: 0.1,
        far: 1000,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[2, 2, 2]} />
        {models?.map((props, i) => (
          <Model3D key={i} {...props} />
        ))}
        {shapes?.map((props, i) => (
          <Shape3D key={`shape-${i}`} {...props} />
        ))}

        {debug && <axesHelper args={[100]} />}
        {(cursor || autoRotate) && (
          <CameraController
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            enableControls={cursor}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
