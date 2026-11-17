import InfiniteScroll from '../ui/infinite-scroll';
import { skills } from '../../data/skillsList';
import { getTechImage } from '../../utils/techImage';
import { Separator } from '../ui/separator';
import { useLanguage } from '../../context/LanguageContext';
import type { Skill } from '../../data/skillsList';
import { shuffleArray } from '../../utils/shuffleArray';
import { useMemo } from 'react';
import type React from 'react';
import { FileBraces, Globe, Container, Wrench, Cpu } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import '../../styles/components/carousel.css';

function SkillSlider({
  label,
  icon,
  skills,
  reverse,
}: {
  label: string;
  icon?: React.ReactNode;
  skills: Skill[];
  reverse: boolean;
}) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  return (
    <div className="items-center px-1 py-2">
      <h3 className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {icon && (
          <span className="inline-flex text-primary [&_svg]:size-4">
            {icon}
          </span>
        )}
        {label}
      </h3>

      <InfiniteScroll
        speed={!isMobile ? 'slow' : 'normal'}
        pauseOnHover={true}
        direction={!reverse}
        itemGapPx={isMobile ? 20 : 50}
      >
        {skills.map((skill, index) => {
          const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(skill.name)}`;
          const itemContent = (
            <>
              <img
                src={getTechImage(skill.name)}
                alt={skill.name + ' logo'}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={
                  'object-contain object-center' +
                  (isMobile ? ' w-6 h-6' : ' w-12 h-12') +
                  (skill.negative ? ' img-negative' : '')
                }
              />
              <span className="font-medium px-1">{skill.name}</span>
            </>
          );
          return isMobile ? (
            <div
              key={index}
              className="carousel-item flex items-center px-3 py-1 border rounded-full bg-card text-foreground shadow-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring relative"
              tabIndex={0}
              data-active={undefined}
              style={{}}
            >
              {itemContent}
            </div>
          ) : (
            <a
              key={index}
              className="carousel-item group flex items-center px-3 py-1 border rounded-full bg-card text-foreground shadow-sm transition-colors duration-200 hover:border-primary/60 hover:bg-accent relative cursor-pointer"
              tabIndex={0}
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-active={undefined}
              style={{}}
              title={t.home.skills.check_on_web}
            >
              {itemContent}
            </a>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default function CompetenciesCarousel() {
  const { t } = useLanguage();
  // Shuffle once per mount: shuffling during render re-ordered every list
  // (and re-measured the marquees) on each re-render, e.g. when the remote
  // config arrived or the language changed.
  const shuffled = useMemo(
    () => ({
      Programming: shuffleArray(skills.Programming),
      Web: shuffleArray(skills.Web),
      DevOps: shuffleArray(skills.DevOps),
      Tools: shuffleArray(skills.Tools),
      Hardware_And_Graphics: shuffleArray(skills.Hardware_And_Graphics),
    }),
    []
  );

  return (
    <section className="mx-auto max-w-7xl rounded-xl border bg-card/80 px-2 py-6 shadow-sm sm:px-4">
      <SkillSlider
        label={t.home.skills.categories.programming}
        icon={<FileBraces />}
        skills={shuffled.Programming}
        reverse={false}
      />
      <Separator className="my-6" />
      <SkillSlider
        label={t.home.skills.categories.web}
        icon={<Globe />}
        skills={shuffled.Web}
        reverse={true}
      />
      <Separator className="my-6" />
      <SkillSlider
        label={t.home.skills.categories.devops}
        icon={<Container />}
        skills={shuffled.DevOps}
        reverse={false}
      />
      <Separator className="my-6" />
      <SkillSlider
        label={t.home.skills.categories.tools}
        icon={<Wrench />}
        skills={shuffled.Tools}
        reverse={true}
      />
      <Separator className="my-6" />
      <SkillSlider
        label={t.home.skills.categories.hardware_and_graphics}
        icon={<Cpu />}
        skills={shuffled.Hardware_And_Graphics}
        reverse={false}
      />
    </section>
  );
}
