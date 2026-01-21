import { RigidBody, CuboidCollider } from '@react-three/rapier';

interface WallProps {
  position: [number, number, number];
  args: [number, number, number];
  color?: string;
  opacity?: number;
}

export default function Wall({
  position,
  args,
  color = '#cbd5e1',
  opacity = 1,
}: WallProps) {
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <mesh>
        <boxGeometry args={args} />
        <meshStandardMaterial
          color={color}
          transparent={opacity < 1}
          opacity={opacity}
          roughness={0.1}
        />
      </mesh>
      <CuboidCollider args={[args[0] / 2, args[1] / 2, args[2] / 2]} />
    </RigidBody>
  );
}
