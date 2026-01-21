import InfiniteScroll from '../ui/infinite-scroll';
import '../../styles/index.css';
import { useIsMobile } from '../../hooks/useMediaQuery';
import SmartLink from '../ui/smartLink';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { shuffleArray } from '../../utils/shuffleArray';

export default function Footer() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const techsIcons = [
    { name: 'React', iconPath: '/techs/react.png', negative: false },
    { name: 'Vite', iconPath: '/techs/vite.png', negative: false },
    {
      name: 'TailwindCSS',
      iconPath: '/techs/tailwindcss.png',
      negative: false,
    },
    { name: 'TypeScript', iconPath: '/techs/typescript.png', negative: false },
    { name: 'shadcn', iconPath: '/techs/shadcn.png', negative: true },
    { name: 'Three.js', iconPath: '/techs/threejs.png', negative: true },
    { name: 'Prettier', iconPath: '/techs/prettier.png', negative: false },
    {
      name: 'Github Copilot',
      iconPath: '/techs/github_copilot.png',
      negative: true,
    },
    {
      name: t.layout.footer.my_time,
      iconPath: '/my_time.png',
      negative: false,
    },
    { name: 'Passion', iconPath: '/hearth.png', negative: true },
  ];

  return (
    <footer className="w-full bg-background border-t border-secondary text-muted-foreground py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center md:text-left">
          © 2026 Quentin Duval
        </div>
        <div className="flex gap-4 items-center">
          <Button asChild variant="primary" className="mx-auto mt-8">
            <SmartLink to="/contact">{t.layout.footer.contact}</SmartLink>
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {t.layout.footer.portfolio_techs}
      </p>
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <InfiniteScroll speed="fast" pauseOnHover={false} direction={false}>
          {shuffleArray(techsIcons).map((tech) => (
            <span key={tech.name} className="flex flex-col items-center mx-2">
              <img
                src={tech.iconPath}
                alt={tech.name}
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
          <p className="underline hover:text-primary">
            {t.layout.footer.credits}
          </p>
        </div>
      </div>
    </footer>
  );
}
