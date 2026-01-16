import { useLanguage } from '../context/LanguageContext';
import Scene3D from '../components/canvas/3DScene';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="p-8 text-center bg-background text-foreground">
      <h1>{t.home.title}</h1>
      <p>{t.home.subtitle}</p>
      {/* <Scene3D modelUrl="/assets/models/multimeter/scene.gltf" position={[0, 0, 0]} rotation={[67.5, 45, 0]} scale={0.15} /> */}
      {/* <Scene3D modelUrl="/assets/models/laptop/scene.gltf" position={[3.20, -2.40, 0]} rotation={[0.4, 3.1, 0.2]} scale={6.1} /> */}
      {/* <Scene3D modelUrl="/assets/models/controller/scene.gltf" position={[0, 0, -1.10]} rotation={[-11.3, -45.0, 0]} scale={0.09} /> */}
      {/* <Scene3D modelUrl="/assets/models/MIDI_keyboard/scene.gltf" position={[0, 0, 0]} rotation={[-11.3, 11.3, 0]} scale={0.006} /> */}
      {/* <Scene3D modelUrl="/assets/models/graphic_tablet/scene.gltf" position={[0, 0, 0]} rotation={[11.3, 0, 0]} scale={1.2} /> */}
      {/* <Scene3D modelUrl="/assets/models/video_camera/scene.gltf" position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} centered={true} /> */}
      <Scene3D
        models={[
          {
            url: '/assets/models/multimeter/scene.gltf',
            position: [0, 0, 0],
            rotation: [1.18, 0.79, 0],
            scale: 0.15,
          },
          {
            url: '/assets/models/laptop/scene.gltf',
            position: [3.2, -2.4, 0],
            rotation: [0.4, 3.1, 0.2],
            scale: 6.1,
          },
        ]}
      />
    </main>
  );
}
