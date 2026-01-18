import type { Project } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/projects/projectCard.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  const getStatusBackgroundColor = (status: Project['status']): string => {
    switch (status) {
      case 'completed':
        return '#90ee90';
      case 'wip':
        return '#ffd700';
      case 'archived':
        return '#e68443ff';
      default:
        return '#ccc';
    }
  };

  const getStatusLabel = (status: Project['status']): string => {
    switch (status) {
      case 'completed':
        return '✅ ' + t.projects.completed;
      case 'wip':
        return '🚧 ' + t.projects.wip;
      case 'archived':
        return '📦 ' + t.projects.archived;
      default:
        return '❓ ' + t.projects.unknown;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={project.imageUrl}
          alt={project.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/600x400?text=No+Image';
          }}
        />
        <Badge
          style={{ background: getStatusBackgroundColor(project.status) }}
          className="mb-2"
        >
          {getStatusLabel(project.status)}
        </Badge>
      </CardContent>
      <CardFooter className="flex flex-col items-center w-full">
        <div className="flex flex-wrap justify-center w-full mb-2">
          {project.topics.map((techno) => (
            <Badge key={techno} className="m-1 bg-secondary">
              {techno}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col items-center w-full">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mb-1"
          >
            {t.projects.codeLink}
          </a>
          {project.homepageUrl && (
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__homepage text-center block mt-1"
            >
              Voir le site
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
