import { useGLTF } from '@react-three/drei';
import { useLayoutEffect } from 'react';
import type * as THREE from 'three';

type Model3DProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  wireframe?: boolean;
};

export default function Model3D({
  url,
  position,
  rotation,
  scale,
  wireframe = false,
}: Model3DProps) {
  const { scene } = useGLTF(url);

  // Layout effect: applied before the first frame is drawn.
  useLayoutEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      materials.forEach((mat) => {
        if ('wireframe' in mat) mat.wireframe = wireframe;
      });
    });
  }, [scene, wireframe]);

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
