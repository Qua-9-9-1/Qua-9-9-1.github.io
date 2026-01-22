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

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  const getStatusBackgroundColor = (status: Project['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-400';
      case 'wip':
        return 'bg-yellow-400';
      case 'archived':
        return 'bg-orange-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: Project['status']): string => {
    switch (status) {
      case 'completed':
        return '✅ ' + t.projects.status.completed;
      case 'wip':
        return '🚧 ' + t.projects.status.wip;
      case 'archived':
        return '📦 ' + t.projects.status.archived;
      default:
        return '❓ ' + t.projects.status.unknown;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">{project.name}</CardTitle>
        <CardDescription className="text-secondary">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={project.imageUrl}
          alt={project.name}
          className="rounded-md mb-4 w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/600x400?text=No+Image';
          }}
        />
        <Badge
          className={
            'center allign-middle mb-4 ' +
            getStatusBackgroundColor(project.status)
          }
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
        <ButtonGroup>
          {project.url && (
            <Button className="flex flex-col items-center hover:underline ">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mb-1"
              >
                {t.projects.codeLink}
              </a>
            </Button>
          )}
          {project.homepageUrl && (
            <Button className="flex flex-col items-center hover:underline ">
              <a
                href={project.homepageUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-1"
              >
                {t.projects.homepageLink}
              </a>
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
