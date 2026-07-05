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
import { ButtonGroup } from '../ui/button-group';
import { useState } from 'react';

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState<number>(0);

  const getStatusBackgroundColor = (status: Project['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'wip':
        return 'bg-yellow-400';
      case 'archived':
        return 'bg-orange-400';
      case 'stopped':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

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

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-2">
        <CardTitle className="text-primary min-h-[1.75rem] text-xl font-semibold flex items-center justify-between gap-3">
          <span className="truncate">{project.name}</span>
          <Badge
            className={'shrink-0 ' + getStatusBackgroundColor(project.status)}
          >
            {getStatusLabel(project.status)}
          </Badge>
        </CardTitle>
        <CardDescription className="text-secondary overflow-hidden min-h-[3rem] text-lg">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col pb-0">
        <img
          src={
            project.imageUrls && project.imageUrls.length > 0
              ? project.imageUrls[imgIndex]
              : (project as any).imageUrl || ''
          }
          alt={project.name}
          className="rounded-md w-full h-40 sm:h-48 md:h-56 object-cover"
          onError={(e) => {
            if (project.imageUrls && imgIndex < project.imageUrls.length - 1) {
              setImgIndex(imgIndex + 1);
            } else {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/600x400?text=No+Image';
            }
          }}
        />
      </CardContent>

      <CardFooter className="flex flex-col items-center w-full mt-auto pt-4">
        <div className="min-h-[3rem] flex items-center">
          <ButtonGroup>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mb-1 cursor-pointer"
              >
                <Button
                  className="flex flex-col items-center hover:underline"
                  aria-label={t.projects.codeLink}
                >
                  {t.projects.codeLink}
                </Button>
              </a>
            )}
            {project.homepageUrl && (
              <a
                href={project.homepageUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-1 cursor-pointer"
              >
                <Button
                  className="flex flex-col items-center hover:underline"
                  aria-label={t.projects.homepageLink}
                >
                  {t.projects.homepageLink}
                </Button>
              </a>
            )}
          </ButtonGroup>
        </div>
      </CardFooter>
    </Card>
  );
}
