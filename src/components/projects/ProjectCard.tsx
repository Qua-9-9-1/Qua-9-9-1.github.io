import type { Project } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '../../lib/utils';

// Soft, tinted status badges: readable in light and dark (the previous solid
// yellow/green fills with white text were ~1.5–2.5:1).
const STATUS_STYLE: Record<Project['status'], string> = {
  completed:
    'bg-emerald-500/15 text-emerald-800 border-emerald-600/30 dark:text-emerald-300 dark:border-emerald-400/30',
  wip: 'bg-amber-400/20 text-amber-900 border-amber-600/30 dark:text-amber-200 dark:border-amber-300/30',
  archived:
    'bg-orange-500/15 text-orange-900 border-orange-600/30 dark:text-orange-200 dark:border-orange-300/30',
  stopped:
    'bg-red-500/15 text-red-800 border-red-600/30 dark:text-red-300 dark:border-red-400/30',
  unknown:
    'bg-muted text-muted-foreground border-border dark:text-muted-foreground',
};

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [imgFailed, setImgFailed] = useState(false);

  const getStatusLabel = (status: Project['status']): string => {
    switch (status) {
      case 'completed':
        return t.projects.status.completed + ' ✅';
      case 'wip':
        return t.projects.status.wip + ' 🚧';
      case 'archived':
        return t.projects.status.archived + ' 📦';
      case 'stopped':
        return t.projects.status.stopped + ' 🛑';
      default:
        return t.projects.status.unknown + ' ❓';
    }
  };

  const imageSrc =
    project.imageUrls && project.imageUrls.length > 0
      ? project.imageUrls[imgIndex]
      : (project as Project & { imageUrl?: string }).imageUrl || '';

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle
            className="text-xl font-semibold leading-tight text-primary truncate"
            title={project.name}
          >
            {project.name}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              'shrink-0 whitespace-nowrap',
              STATUS_STYLE[project.status] ?? STATUS_STYLE.unknown
            )}
          >
            {getStatusLabel(project.status)}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[3.9rem]">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
          {!imageSrc || imgFailed ? (
            // Local placeholder (no third-party request, matches the theme).
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/25 via-muted to-brand-2/25">
              <span className="text-5xl font-black tracking-tight text-primary/70 select-none">
                {project.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={project.name}
              loading="lazy"
              decoding="async"
              width={600}
              height={338}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => {
                if (
                  project.imageUrls &&
                  imgIndex < project.imageUrls.length - 1
                ) {
                  setImgIndex(imgIndex + 1);
                } else {
                  setImgFailed(true);
                }
              }}
            />
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap justify-center gap-2 pt-5">
        {project.url && (
          <Button asChild variant="outline" size="sm">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t.projects.codeLink} – ${project.name}`}
            >
              <Github />
              {t.projects.codeLink}
            </a>
          </Button>
        )}
        {project.homepageUrl && (
          <Button asChild variant="primary" size="sm">
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t.projects.homepageLink} – ${project.name}`}
            >
              <ExternalLink />
              {t.projects.homepageLink}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
