import InfiniteScroll from '../ui/infinite-scroll';
import { skills } from '../../data/skillsIcons';
import { Separator } from '../ui/separator';
import { useLanguage } from '../../context/LanguageContext';
import type { Skill } from '../../data/skillsIcons';
import { shuffleArray } from '../../utils/shuffleArray';
import type React from 'react';
import {
  FileBraces,
  Globe,
  Container,
  Wrench,
  MessageSquareCode,
} from 'lucide-react';
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
    <div className="items-center px-1 py-2 bg-surface text-foreground shadow-sm">
      <h3 className="text-center font-bold mb-4 text-muted-foreground flex justify-center items-center">
        {label}
        {icon && <span className="inline-block ml-2">{icon}</span>}
      </h3>

      <InfiniteScroll speed="normal" pauseOnHover={true} direction={!reverse}>
        {skills.map((skill, index) => {
          const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(skill.name)}`;
          const itemContent = (
            <>
              <img
                src={skill.img}
                alt={skill.name}
                className={
                  'object-contain object-center' +
                  (isMobile ? ' w-6 h-6' : ' w-12 h-12') +
                  (skill.negative ? ' img-negative' : '')
                }
              />
              <span className="font-medium px-2">{skill.name}</span>
              {!isMobile && (
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-primary text-primary-foreground text-xs opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 z-10 shadow">
                  check on web
                </span>
              )}
            </>
          );
          return isMobile ? (
            <div
              key={index}
              className="carousel-item flex items-center px-3 py-1 border rounded-full bg-surface text-foreground shadow-sm transition-colors duration-200 focus:outline focus:ring-2  relative"
              tabIndex={0}
              data-active={undefined}
              style={{}}
            >
              {itemContent}
            </div>
          ) : (
            <a
              key={index}
              className="carousel-item group flex items-center px-3 py-1 border rounded-full bg-surface text-foreground shadow-sm transition-colors duration-200 hover:border-primary relative cursor-pointer"
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

  return (
    <section>
      <SkillSlider
        label={t.home.skills.categories.programming}
        icon={<FileBraces />}
        skills={shuffleArray(skills.Programming)}
        reverse={false}
      />
      <Separator className="my-8 bg-secondary" />
      <SkillSlider
        label={t.home.skills.categories.web}
        icon={<Globe />}
        skills={shuffleArray(skills.Web)}
        reverse={true}
      />
      <Separator className="my-8 bg-secondary" />
      <SkillSlider
        label={t.home.skills.categories.devops}
        icon={<Container />}
        skills={shuffleArray(skills.DevOps)}
        reverse={false}
      />
      <Separator className="my-8 bg-secondary" />
      <SkillSlider
        label={t.home.skills.categories.tools}
        icon={<Wrench />}
        skills={shuffleArray(skills.Tools)}
        reverse={true}
      />
      <Separator className="my-8 bg-secondary" />
      <SkillSlider
        label={t.home.skills.categories.others}
        icon={<MessageSquareCode />}
        skills={shuffleArray(skills.Others)}
        reverse={false}
      />
    </section>
  );
}
