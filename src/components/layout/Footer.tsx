import InfiniteScroll from '../ui/infinite-scroll';
import '../../styles/index.css';
import { useState } from 'react';
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

  return (
    <footer className="w-full bg-background border-t border-secondary text-muted-foreground py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-row md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center md:text-left">
          © 2026 Quentin Duval
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="mailto:quentduva@gmail.com"
            className="hover:text-primary text-secondary"
          >
            <Mail />
          </a>
          <a
            href="https://www.linkedin.com/in/quentin-duval-1a16a0186/"
            className="hover:text-primary text-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href={'https://github.com/' + config.github_user}
            className="hover:text-primary text-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {t.layout.footer.portfolio_techs}
      </p>
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <InfiniteScroll
          speed="slow"
          pauseOnHover={false}
          direction={false}
          itemGapPx={isMobile ? 60 : 10}
        >
          {shuffleArray(techsIcons).map((tech) => (
            <span key={tech.name} className="flex flex-col items-center mx-2">
              <img
                src={tech.iconPath ? tech.iconPath : getTechImage(tech.name)}
                alt={tech.name + ' logo'}
                className={
                  'object-contain object-center' +
                  (isMobile ? ' w-7 h-7' : ' w-9 h-9') +
                  (tech.negative === true ? ' img-negative' : '')
                }
              />
              <span className="mt-1 text-center">{tech.name}</span>
            </span>
          ))}
        </InfiniteScroll>
      </div>
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
        <div />
        <div className="text-xs text-center md:text-right">
          <p
            className="underline hover:text-primary cursor-pointer"
            onClick={() => setIsCreditsModalOpen(true)}
          >
            {t.layout.footer.credits.title}
          </p>
        </div>
      </div>
      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />
    </footer>
  );
}
