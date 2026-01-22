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
        <CardTitle className="text-primary min-h-[1.75rem] text-xl font-semibold">{project.name}</CardTitle>
        <CardDescription
          className="text-secondary overflow-hidden min-h-[3rem] text-lg"
        >
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="rounded-md mb-4 w-full h-40 sm:h-48 md:h-56 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/600x400?text=No+Image';
          }}
        />
        <div className="min-h-[2rem] flex items-center">
          <Badge
            className={
              'center allign-middle ' + getStatusBackgroundColor(project.status)
            }
          >
            {getStatusLabel(project.status)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center w-full mt-auto">
        <div className="flex flex-wrap justify-center items-center content-center w-full mb-2 h-[4rem] md:h-[5rem] overflow-y-auto">
          {project.topics.map((techno) => (
            <Badge key={techno} className="m-1 bg-secondary">
              {techno}
            </Badge>
          ))}
        </div>
        <div className="min-h-[3rem] flex items-center">
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
        </div>
      </CardFooter>
    </Card>
  );
}
