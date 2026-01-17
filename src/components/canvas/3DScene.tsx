import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
  type?: 'sphere' | 'cube';
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
};

export default function Scene3D({
  models,
  shapes,
  psychicCubes,
}: Scene3DProps) {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
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
      <axesHelper args={[100]} />
      <OrbitControls />
    </Canvas>
  );
}
