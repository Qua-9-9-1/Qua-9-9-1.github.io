import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model3D from './3DModel';

type ModelProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  wireframe?: boolean;
};

type Scene3DProps = {
  models: ModelProps[];
};

export default function Scene3D({ models }: Scene3DProps) {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.95} />
      <directionalLight position={[2, 2, 2]} />
      {models.map((props, i) => (
        <Model3D key={i} {...props} />
      ))}
      <axesHelper args={[100]} />
      <OrbitControls />
    </Canvas>
  );
}
