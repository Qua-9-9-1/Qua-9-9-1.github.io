import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { JSX } from 'react/jsx-dev-runtime';
import * as THREE from 'three';

type ShapeType = 'sphere' | 'cube' | 'cone' | 'cylinder' | 'torus' | 'pyramid';

type Shape3DProps = JSX.IntrinsicElements['mesh'] & {
  type?: ShapeType;
  color?: string;
  wireframe?: boolean;
  size?: number;
  textureUrl?: string;
  fragmentShaderUrl?: string;
  vertexShaderUrl?: string;
};

const defaultVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export default function Shape3D({
  type,
  position,
  rotation,
  scale,
  color = '#ff8f00',
  wireframe = false,
  size = 1,
  textureUrl,
  fragmentShaderUrl,
  vertexShaderUrl,
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
    case 'cone':
      geometry = <coneGeometry args={[size / 2, size, 32]} />;
      break;
    case 'cylinder':
      geometry = <cylinderGeometry args={[size / 2, size / 2, size, 32]} />;
      break;
    case 'torus':
      geometry = <torusGeometry args={[size / 2, size / 6, 16, 100]} />;
      break;
    case 'pyramid':
      geometry = <coneGeometry args={[size / 2, size, 4]} />;
      break;
    default:
      geometry = <boxGeometry args={[size, size, size]} />;
  }

  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [fragmentShader, setFragmentShader] = useState<string | null>(null);
  const [vertexShader, setVertexShader] = useState<string>(defaultVertexShader);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!textureUrl) {
      setTexture(null);
      return;
    }

    let disposed = false;
    const loader = new THREE.TextureLoader();
    let currentTexture: THREE.Texture | null = null;
    loader.load(
      textureUrl,
      (loadedTexture) => {
        if (disposed) {
          loadedTexture.dispose();
          return;
        }
        currentTexture = loadedTexture;
        setTexture(loadedTexture);
      },
      undefined,
      () => {
        if (disposed) return;
        setTexture(null);
      }
    );

    return () => {
      disposed = true;
      if (currentTexture) {
        currentTexture.dispose();
      }
    };
  }, [textureUrl]);

  useEffect(() => {
    if (!fragmentShaderUrl) {
      setFragmentShader(null);
      return;
    }

    let cancelled = false;
    const loader = new THREE.FileLoader();
    loader.setResponseType('text');
    loader.load(
      fragmentShaderUrl,
      (data) => {
        if (cancelled) return;
        setFragmentShader(typeof data === 'string' ? data : data.toString());
      },
      undefined,
      () => {
        if (cancelled) return;
        setFragmentShader(null);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [fragmentShaderUrl]);

  useEffect(() => {
    if (!vertexShaderUrl) {
      setVertexShader(defaultVertexShader);
      return;
    }

    let cancelled = false;
    const loader = new THREE.FileLoader();
    loader.setResponseType('text');
    loader.load(
      vertexShaderUrl,
      (data) => {
        if (cancelled) return;
        setVertexShader(typeof data === 'string' ? data : data.toString());
      },
      undefined,
      () => {
        if (cancelled) return;
        setVertexShader(defaultVertexShader);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [vertexShaderUrl]);

  const shaderUniforms = useMemo(() => {
    const uniforms: Record<string, THREE.IUniform> = {
      u_time: { value: 0 },
      u_color: { value: new THREE.Color(color) },
    };

    if (texture) {
      uniforms.u_texture = { value: texture };
    }

    return uniforms;
  }, [color, texture]);

  useFrame(({ clock }) => {
    const material = shaderMaterialRef.current;
    if (material?.uniforms.u_time) {
      material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  const hasShader = Boolean(fragmentShader);

  return (
    <mesh position={position} rotation={rotation} scale={scale} {...rest}>
      {geometry}
      {hasShader ? (
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader ?? ''}
          uniforms={shaderUniforms}
          wireframe={wireframe}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          map={texture ?? undefined}
        />
      )}
    </mesh>
  );
}
