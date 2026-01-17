import { useLoader } from '@react-three/fiber';
import type { JSX } from 'react/jsx-dev-runtime';
import * as THREE from 'three';

type ShapeType = 'sphere' | 'cube';

type Shape3DProps = JSX.IntrinsicElements['mesh'] & {
  type?: ShapeType;
  color?: string;
  wireframe?: boolean;
  size?: number;
  textureUrl?: string;
};

export default function Shape3D({
  type,
  position,
  rotation,
  scale,
  color = '#ff8f00',
  wireframe = false,
  size = 1,
  textureUrl,
  ...rest
}: Shape3DProps) {
  let geometry;

  switch (type) {
    case 'sphere':
      geometry = <sphereGeometry args={[size, 32, 32]} />;
      break;
    case 'cube':
      geometry = <boxGeometry args={[size, size, size]} />;
      break;
    default:
      geometry = <boxGeometry args={[size, size, size]} />;
  }

  const texture = textureUrl
    ? useLoader(THREE.TextureLoader, textureUrl)
    : undefined;

  return (
    <mesh position={position} rotation={rotation} scale={scale} {...rest}>
      {geometry}
      <meshStandardMaterial color={color} wireframe={wireframe} map={texture} />
    </mesh>
  );
}
