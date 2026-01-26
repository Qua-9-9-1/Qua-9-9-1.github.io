import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { useLanguage } from '../../context/LanguageContext';
import {
  Atom,
  Zap,
  Code,
  Waves,
  SquareDashedBottom,
  Shell,
  Pyramid,
  CircleParking,
  Bolt,
} from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({ isOpen, onClose }: ThemeModalProps) {
  const { t } = useLanguage();
  const techs = [
    {
      icon: <Atom className="text-primary" />,
      name: 'React',
      url: 'https://react.dev',
    },
    {
      icon: <Zap className="text-primary" />,
      name: 'Vite',
      url: 'https://vitejs.dev',
    },
    {
      icon: <Code className="text-secondary" />,
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org',
    },

    {
      icon: <Waves className="text-secondary" />,
      name: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
    },
    {
      icon: <SquareDashedBottom className="text-primary" />,
      name: 'shadcn/ui',
      url: 'https://ui.shadcn.com',
    },
    {
      icon: <Pyramid className="text-primary" />,
      name: 'Three.js',
      url: 'https://threejs.org',
    },
    {
      icon: <Shell className="text-secondary" />,
      name: 'Lucide Icons',
      url: 'https://lucide.dev',
    },
    {
      icon: <CircleParking className="text-secondary" />,
      name: 'Prettier',
      url: 'https://prettier.io',
    },

    {
      icon: <Bolt className="text-primary" />,
      name: 'ESLint',
      url: 'https://eslint.org',
    },
  ];
  const models = [
    {
      name: t.layout.footer.credits.models.laptop,
      licensePath: '/models/laptop/license.txt',
    },
    {
      name: t.layout.footer.credits.models.multimeter,
      licensePath: '/models/multimeter/license.txt',
    },
    {
      name: t.layout.footer.credits.models.controller,
      licensePath: '/models/controller/license.txt',
    },
    {
      name: t.layout.footer.credits.models.midi_keyboard,
      licensePath: '/models/MIDI_keyboard/license.txt',
    },
    {
      name: t.layout.footer.credits.models.graphic_tablet,
      licensePath: '/models/graphic_tablet/license.txt',
    },
    {
      name: t.layout.footer.credits.models.video_camera,
      licensePath: '/models/video_camera/license.txt',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] card text-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t.layout.footer.credits.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t.layout.footer.credits.title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-primary">
              {t.layout.footer.credits.techs}
            </h3>
            <Separator className="my-2 bg-secondary" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {techs.map((tech) => (
                <li
                  key={tech.name}
                  className="text-sm flex flex-row items-center gap-2"
                >
                  {tech.icon}
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary">
              {t.layout.footer.credits.models.title}
            </h3>
            <Separator className="my-2 bg-secondary" />
            <p className="text-sm text-muted-foreground">
              {t.layout.footer.credits.models.desc}
            </p>
            <ul className="mt-2 space-y-1">
              {models.map((m) => (
                <li key={m.name} className="text-sm">
                  <span className="font-medium">{m.name}</span> —
                  <a
                    href={m.licensePath}
                    className="ml-1 underline text-primary hover:text-primary"
                  >
                    {t.layout.footer.credits.models.license}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary">
              {t.layout.footer.credits.UI.title}
            </h3>
            <Separator className="my-2 bg-secondary" />
            <ul className="space-y-1 text-sm">
              <li>
                {t.layout.footer.credits.UI.icons_by}{' '}
                <a
                  href="https://lucide.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary hover:text-primary"
                >
                  Lucide
                </a>
              </li>
              <li>
                {t.layout.footer.credits.UI.ui_by}{' '}
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary hover:text-primary"
                >
                  shadcn/ui
                </a>
              </li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
