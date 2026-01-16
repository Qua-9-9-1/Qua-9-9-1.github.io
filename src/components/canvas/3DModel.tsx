import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useGpuTier } from '../../hooks/useGpuQuery';

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
  const gpuInfo = useGpuTier();

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ('wireframe' in mat) mat.wireframe = wireframe;
          });
        } else if ('wireframe' in mesh.material) {
          mesh.material.wireframe = wireframe;
        }
      }
    });
    if (gpuInfo?.isLowEnd == true) {
        console.log("Low-end GPU detected, applying optimizations.");
    } else {
        console.log("GPU is sufficient, no optimizations applied.");
    }
  }, [scene, wireframe, gpuInfo]);

  return (
    <>
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      />
      {/* <div style={{ position: 'absolute', top: 100, left: 100, background: '#fff8f2', padding: 8, borderRadius: 8 }}>
        <div>
          <strong>Position:</strong> {_position.map((v) => v.toFixed(2)).join(', ')}
        </div>
        <Button onClick={() => setPosition(([x, y, z]) => [x, y + 0.1, z])}>Up Y</Button>
        <Button onClick={() => setPosition(([x, y, z]) => [x, y - 0.1, z])}>Down Y</Button>
        <Button onClick={() => setPosition(([x, y, z]) => [x, y, z + 0.1])}>Forward Z</Button>
        <Button onClick={() => setPosition(([x, y, z]) => [x, y, z - 0.1])}>Back Z</Button>
        <Button onClick={() => setPosition(([x, y, z]) => [x + 0.1, y, z])}>Right X</Button>
        <Button onClick={() => setPosition(([x, y, z]) => [x - 0.1, y, z])}>Left X</Button>
        <div style={{ marginTop: 8 }}>
          <strong>Rotation X:</strong> {(_rotation[0]).toFixed(1)}°
          <strong>Rotation Y:</strong> {(_rotation[1]).toFixed(1)}°
          <strong>Rotation Z:</strong> {(_rotation[2]).toFixed(1)}°
        </div>
        <Button onClick={() => setRotation(([x, y, z]) => [x + RadiansToDegrees(Math.PI / 16), y, z])}>Rotate +X</Button>
        <Button onClick={() => setRotation(([x, y, z]) => [x - RadiansToDegrees(Math.PI / 16), y, z])}>Rotate -X</Button>
        <Button onClick={() => setRotation(([x, y, z]) => [x, y + RadiansToDegrees(Math.PI / 16), z])}>Rotate +Y</Button>
        <Button onClick={() => setRotation(([x, y, z]) => [x, y - RadiansToDegrees(Math.PI / 16), z])}>Rotate -Y</Button>
        <Button onClick={() => setRotation(([x, y, z]) => [x, y, z + RadiansToDegrees(Math.PI / 16)])}>Rotate +Z</Button>
        <Button onClick={() => setRotation(([x, y, z]) => [x, y, z - RadiansToDegrees(Math.PI / 16)])}>Rotate -Z</Button>
        <div style={{ marginTop: 8 }}>
          <strong>Scale:</strong> {Array.isArray(_scale) ? _scale.map((v) => v.toFixed(2)).join(', ') : _scale.toFixed(2)}
        </div>
        <Button onClick={() => setScale((s) => (Array.isArray(s) ? s.map((v) => v + 0.001) : s + 0.001))}>Increase Scale</Button>
        <Button onClick={() => setScale((s) => (Array.isArray(s) ? s.map((v) => Math.max(0.001, v - 0.001)) : Math.max(0.001, s - 0.001)))}>Decrease Scale</Button>
        <div style={{ marginTop: 8 }}>
          <strong>Auto-rotation Y (scene):</strong> {(autoRotationY * 180 / Math.PI).toFixed(1)}°
        </div> */}
      </>
  );
}