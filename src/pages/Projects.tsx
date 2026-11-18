import { useState, useMemo } from 'react';
import { useProjects } from '../hooks/useGithubProjects';
import { useLanguage } from '../context/LanguageContext';
import ProjectList from '../components/projects/ProjectList';
import LoadingContent from '../components/home/LoadingContent';
import PhysicsFilterScene from '../components/projects/PhysicsFilterScene';
import { TOPIC_TO_CATEGORY, getCategoryColor } from '../data/topicCategories';

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const { t } = useLanguage();
  const [selectedTechnos, setSelectedTechnos] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    if (!projects) return [];
    const categories = new Set<string>();
    projects.forEach((p) =>
      p.topics.forEach((topic) => {
        const cat = TOPIC_TO_CATEGORY[topic];
        if (cat) categories.add(cat);
      })
    );
    return Array.from(categories).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTechnos.length === 0) return projects;
    return projects.filter((project) =>
      project.topics.some((topic) =>
        selectedTechnos.includes(TOPIC_TO_CATEGORY[topic])
      )
    );
  }, [projects, selectedTechnos]);

  if (loading) return <LoadingContent />;
  if (error)
    return (
      <div>
        {t.projects.loadingError} {error}
      </div>
    );

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col p-4 sm:px-6">
      <div
        style={{ touchAction: 'none' }}
        className="relative mb-8 h-[clamp(280px,42vh,460px)] w-full overflow-hidden rounded-2xl border bg-card/50 shadow-sm backdrop-blur-[2px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-2"
        />
        <PhysicsFilterScene
          technos={allCategories}
          onFilterChange={setSelectedTechnos}
        />
      </div>

      <div className="w-full">
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {selectedTechnos.length === 0
              ? t.projects.categories.all
              : t.projects.categories.filter}
          </h2>
          {selectedTechnos.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
              style={{
                borderColor: `color-mix(in oklch, ${getCategoryColor(cat)} 45%, transparent)`,
                background: `color-mix(in oklch, ${getCategoryColor(cat)} 14%, transparent)`,
              }}
            >
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ background: getCategoryColor(cat) }}
              />
              {t.projects.categories[cat as keyof typeof t.projects.categories]}
            </span>
          ))}
          <span className="ml-auto rounded-full border px-3 py-1 text-sm tabular-nums text-muted-foreground">
            {filteredProjects.length}
          </span>
        </div>
        <ProjectList projects={filteredProjects} />
      </div>
    </div>
  );
}
