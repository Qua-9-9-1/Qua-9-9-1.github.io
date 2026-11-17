import InfiniteScroll from '../ui/infinite-scroll';
import { useMemo, useState } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useLanguage } from '../../context/LanguageContext';
import { shuffleArray } from '../../utils/shuffleArray';
import { getTechImage } from '../../utils/techImage';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import CreditsModal from './CreditsModal';

export default function Footer() {
  const { t } = useLanguage();
  const { config } = useRemoteConfig();
  const isMobile = useIsMobile();
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);

  const techsIcons = [
    { name: 'React', negative: false },
    { name: 'Vite', negative: false },
    {
      name: 'Tailwind CSS',
      negative: false,
    },
    { name: 'TypeScript', negative: false },
    { name: 'shadcn', negative: true },
    { name: 'Three.js', negative: true },
    { name: 'Prettier', negative: false },
    { name: 'ESLint', negative: false },
    { name: 'Husky', negative: false },
    { name: 'Vitest', negative: false },
    {
      name: 'Github Copilot',
      negative: true,
    },
    {
      name: t.layout.footer.my_time,
      iconPath: '/my_time.webp',
      negative: false,
    },
    { name: 'Passion', iconPath: '/hearth.webp', negative: true },
  ];

  // Shuffle once per mount / language change, not on every render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shuffledTechs = useMemo(() => shuffleArray(techsIcons), [t]);

  return (
    <footer className="relative w-full border-t bg-card/60 backdrop-blur-sm text-muted-foreground py-8 mt-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-60"
      />
      <div className="max-w-4xl mx-auto px-4 flex flex-row md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center md:text-left">
          © 2026 Quentin Duval
        </div>
        <div className="flex gap-1 items-center">
          <a
            aria-label="Email"
            href="mailto:quentduva@gmail.com"
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-primary [&_svg]:size-5"
          >
            <Mail />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/quentin-duval-1a16a0186/"
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-primary [&_svg]:size-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            aria-label="GitHub"
            href={'https://github.com/' + config.github_user}
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-primary [&_svg]:size-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>

      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {t.layout.footer.portfolio_techs}
      </p>
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <InfiniteScroll
          speed="slow"
          pauseOnHover={false}
          direction={false}
          itemGapPx={isMobile ? 60 : 10}
        >
          {shuffledTechs.map((tech) => (
            <span key={tech.name} className="flex flex-col items-center mx-2">
              <img
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                src={tech.iconPath ? tech.iconPath : getTechImage(tech.name)}
                alt={tech.name + ' logo'}
                className={
                  'object-contain object-center' +
                  (isMobile ? ' w-7 h-7' : ' w-9 h-9') +
                  (tech.negative === true ? ' img-negative' : '')
                }
              />
              <span className="mt-1 text-center text-xs">{tech.name}</span>
            </span>
          ))}
        </InfiniteScroll>
      </div>
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
        <div />
        <div className="text-xs text-center md:text-right">
          <button
            type="button"
            className="underline underline-offset-4 hover:text-primary"
            onClick={() => setIsCreditsModalOpen(true)}
          >
            {t.layout.footer.credits.title}
          </button>
        </div>
      </div>
      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />
    </footer>
  );
}
