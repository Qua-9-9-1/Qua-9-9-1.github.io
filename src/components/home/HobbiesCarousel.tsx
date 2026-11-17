import * as React from 'react';
import { useGLTF } from '@react-three/drei';
import { useLanguage } from '../../context/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Scene3D, { type Scene3DProps } from '../canvas/3DScene';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';
import { FormatedText } from '../ui/formatedText';
import LoadingContent from './LoadingContent';

// Static scene descriptions (index = hobby index in the translations).
const HOBBY_SCENES: Scene3DProps[] = [
  // Development
  {
    models: [
      {
        url: '/models/laptop/scene.glb',
        position: [1.8, -2.0, 1.8],
        rotation: [0.4, 3.1, 0.2],
        scale: 3.9,
      },
    ],
  },
  // Electronics
  {
    models: [
      {
        url: '/models/multimeter/scene.glb',
        position: [0, 0, 0],
        rotation: [67.5, 3.3, 0],
        scale: 0.25,
      },
    ],
  },
  // Gaming & Retro Gaming
  {
    models: [
      {
        url: '/models/controller/scene.glb',
        position: [0, 0, -0.5],
        rotation: [-11.3, -45.0, 0],
        scale: 0.08,
      },
    ],
  },
  // Music
  {
    models: [
      {
        url: '/models/MIDI_keyboard/scene.glb',
        position: [0, 0, 0],
        rotation: [-11.3, 11.3, 0],
        scale: 0.01,
      },
    ],
  },
  // Drawing and design
  {
    models: [
      {
        url: '/models/graphic_tablet/scene.glb',
        position: [0, 0, 0],
        rotation: [11.3, 0, 0],
        scale: 0.8,
      },
    ],
  },
  // 3D (dev) and shaders
  {
    models: [
      {
        url: '/models/nodl/logo.glb',
        position: [0.9, 1.05, 0],
        rotation: [0.67, 0, 0.2],
        scale: 0.5,
      },
    ],
    shapes: [
      {
        type: 'cone',
        position: [-1.1, 0.6, -0.6],
        rotation: [0.1, 0, 0.5],
        scale: 1.5,
        color: '#ff8f00',
        wireframe: true,
        size: 1,
      },
      {
        type: 'torus',
        position: [0, -1, 1],
        rotation: [1.5, 0.92, 0],
        scale: 1.2,
        wireframe: false,
        size: 1,
        fragmentShaderUrl: '/shaders/frag/psychedelic.glsl',
      },
    ],
  },
  // Videos
  {
    models: [
      {
        url: '/models/video_camera/scene.glb',
        position: [35, -2, -5],
        rotation: [0, 0, 0],
        scale: 10,
      },
    ],
  },
];

const wrap = (i: number, n: number) => ((i % n) + n) % n;

function preloadScene(index: number) {
  HOBBY_SCENES[index]?.models?.forEach((m) => useGLTF.preload(m.url));
}

const sceneFallback = (
  <div className="w-full h-full flex items-center justify-center">
    <LoadingContent />
  </div>
);

export default function HobbiesCarousel() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  // Pause the render loop when the carousel is scrolled out of view.
  const [rootRef, inView] = useInView<HTMLDivElement>();

  const items = t.home.hobbies.items;
  const total = items.length;

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  // Warm the GLTF cache for the slides around the current one.
  React.useEffect(() => {
    preloadScene(wrap(current + 1, total));
    preloadScene(wrap(current - 1, total));
  }, [current, total]);

  // Only the current slide and its two neighbours own a WebGL context (max 3
  // instead of up to 7 canvases all rendering at 60 fps). Neighbours render
  // on demand (a single frame) so they look right while swiping.
  const isMounted = (index: number) =>
    index === current ||
    index === wrap(current + 1, total) ||
    index === wrap(current - 1, total);

  const renderScene = (index: number) => {
    const scene = HOBBY_SCENES[index];
    if (!scene) return null;
    if (!isMounted(index)) return sceneFallback;
    return (
      <Scene3D
        {...scene}
        autoRotate
        frameloop={index === current && inView ? 'always' : 'demand'}
      />
    );
  };

  return (
    <div
      ref={rootRef}
      className={cn('mx-auto', isMobile ? 'max-w-sm' : 'max-w-5xl')}
    >
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {items.map((hobby, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className={cn('p-6', isMobile ? '' : 'p-8')}>
                  {isMobile ? (
                    <div className="flex flex-col space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted/30">
                        {renderScene(index)}
                      </div>
                      <h4 className="text-xl font-bold text-center text-primary">
                        {hobby.label}
                      </h4>
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">
                        <FormatedText text={hobby.description} />
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-[1fr_400px] gap-8 items-center min-h-[400px]">
                      <div className="space-y-4">
                        <h4 className="text-3xl font-bold text-primary">
                          {hobby.label}
                        </h4>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          <FormatedText text={hobby.description} />
                        </p>
                      </div>
                      <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30 shadow-lg">
                        {renderScene(index)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`${index + 1} / ${count}`}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              current === index
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
          />
        ))}
      </div>
    </div>
  );
}
