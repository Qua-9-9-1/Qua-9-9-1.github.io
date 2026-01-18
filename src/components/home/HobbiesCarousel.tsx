import * as React from 'react';
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
import Scene3D from '../canvas/3DScene';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

interface HobbyScene {
  label: string;
  description: string;
  getScene: () => React.ReactNode;
}

export default function HobbiesCarousel() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [loadedScenes, setLoadedScenes] = React.useState<Set<number>>(
    new Set([0])
  );

  const hobbiesWithScenes: HobbyScene[] = React.useMemo(
    () =>
      t.home.hobbies.items.map((hobby, index) => {
        const getScene = () => {
          switch (index) {
            case 0: // Development
              return (
                <Scene3D
                  models={[
                    {
                      url: '/assets/models/laptop/scene.gltf',
                      position: [3.2, -2.4, 0],
                      rotation: [0.4, 3.1, 0.2],
                      scale: 6.1,
                    },
                  ]}
                />
              );
            case 1: // Electronics
              return (
                <Scene3D
                  models={[
                    {
                      url: '/assets/models/multimeter/scene.gltf',
                      position: [0, 0, 0],
                      rotation: [67.5, 45, 0],
                      scale: 0.15,
                    },
                  ]}
                />
              );
            case 2: // Gaming & Retro Gaming
              return (
                <Scene3D
                  models={[
                    {
                      url: '/assets/models/controller/scene.gltf',
                      position: [0, 0, -1.1],
                      rotation: [-11.3, -45.0, 0],
                      scale: 0.09,
                    },
                  ]}
                />
              );
            case 3: // Music
              return (
                <Scene3D
                  models={[
                    {
                      url: '/assets/models/MIDI_keyboard/scene.gltf',
                      position: [0, 0, 0],
                      rotation: [-11.3, 11.3, 0],
                      scale: 0.006,
                    },
                  ]}
                />
              );
            case 4: // Drawing and design
              return (
                <Scene3D
                  models={[
                    {
                      url: '/assets/models/graphic_tablet/scene.gltf',
                      position: [0, 0, 0],
                      rotation: [11.3, 0, 0],
                      scale: 1.2,
                    },
                  ]}
                />
              );
            case 5: // 3D (dev) and shaders
              return (
                <Scene3D
                  psychicCubes={[
                    { position: [0, 0, 0], rotation: [0, 0, 0], size: 1 },
                  ]}
                />
              );
            case 6: // Videos
              return (
                <Scene3D
                  models={[
                    {
                      url: '/assets/models/video_camera/scene.gltf',
                      position: [0, 0, 0],
                      rotation: [0, 0, 0],
                      scale: 1,
                      centered: true,
                    },
                  ]}
                />
              );
            default:
              return (
                <Scene3D
                  psychicCubes={[
                    { position: [0, 0, 0], rotation: [0, 0, 0], size: 1 },
                  ]}
                />
              );
          }
        };

        return {
          label: hobby.label,
          description: hobby.description,
          getScene,
        };
      }),
    [t.home.hobbies.items]
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);

      setLoadedScenes((prev) => {
        const newSet = new Set(prev);
        newSet.add(selected);
        if (selected > 0) newSet.add(selected - 1);
        if (selected < count - 1) newSet.add(selected + 1);
        return newSet;
      });
    });
  }, [api, count]);

  React.useEffect(() => {
    setLoadedScenes(new Set([0, 1]));
  }, []);

  return (
    <div className={cn('mx-auto', isMobile ? 'max-w-sm' : 'max-w-5xl')}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {hobbiesWithScenes.map((hobby, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className={cn('p-6', isMobile ? '' : 'p-8')}>
                  {isMobile ? (
                    <div className="flex flex-col space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted/30">
                        {loadedScenes.has(index) ? (
                          hobby.getScene()
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-center text-primary">
                        {hobby.label}
                      </h4>
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">
                        {hobby.description}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-[1fr_400px] gap-8 items-center min-h-[400px]">
                      <div className="space-y-4">
                        <h4 className="text-3xl font-bold text-primary">
                          {hobby.label}
                        </h4>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {hobby.description}
                        </p>
                      </div>
                      <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30 shadow-lg">
                        {loadedScenes.has(index) ? (
                          hobby.getScene()
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
                          </div>
                        )}
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
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              current === index
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Aller au hobby ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
