import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RoundedBox } from '@react-three/drei';

interface WallProps {
  position: [number, number, number];
  args: [number, number, number];
  color?: string;
  opacity?: number;
  /** false = invisible collider (scene bounds) */
  visible?: boolean;
}

export default function Wall({
  position,
  args,
  color = '#cbd5e1',
  opacity = 1,
  visible = true,
}: WallProps) {
  const radius = Math.min(args[0], args[1], args[2]) / 2;
  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      {visible && (
        <RoundedBox args={args} radius={radius * 0.98} smoothness={3}>
          {/* Flat colour: walls are UI elements, not lit objects. */}
          <meshBasicMaterial
            color={color}
            transparent={opacity < 1}
            opacity={opacity}
          />
        </RoundedBox>
      )}
      <CuboidCollider args={[args[0] / 2, args[1] / 2, args[2] / 2]} />
    </RigidBody>
  );
}
