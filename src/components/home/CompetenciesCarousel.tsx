import InfiniteScroll from '../ui/infinite-scroll';
import { skills } from '../../data/skillsIcons';
import { Separator } from '../ui/separator';
import { useLanguage } from '../../context/LanguageContext';
import type { Skill } from '../../data/skillsIcons';
import { shuffleArray } from '../../utils/shuffleArray';
import type React from 'react';
import { FileBraces, Globe, Container, Wrench, MessageSquareCode } from 'lucide-react';

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
  return (
    <div className="items-center px-4 py-2 border bg-surface text-foreground shadow-sm">
      <h3 className="text-center font-bold mb-4 text-muted-foreground flex justify-center items-center">
        {label}
        {icon && <span className="inline-block ml-2">{icon}</span>}
      </h3>

      <InfiniteScroll speed="normal" pauseOnHover={true} direction={!reverse}>
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center px-3 py-1 border rounded-full bg-surface text-foreground shadow-sm"
          >
            <img
              src={skill.img}
              alt={skill.name}
              className={
                'w-12 h-12 object-contain object-center' +
                (skill.negative ? ' img-negative' : '')
              }
            />
            <span className="font-medium px-2">{skill.name}</span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default function CompetenciesCarousel() {
  const { t } = useLanguage();

  return (
    <section className="py-10">
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
