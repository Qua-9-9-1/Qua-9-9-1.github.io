import type { Project } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/projects/projectCard.css';

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
    <article className="project-card">
      <div className="project-card__image">
        <img
          src={project.imageUrl}
          alt={project.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/600x400?text=No+Image';
          }}
        />
      </div>

      <div className="project-card__content">
        <div className="project-card__header">
          <h3>{project.name}</h3>
          <span
            className="project-card__status"
            style={{ background: getStatusBackgroundColor(project.status) }}
          >
            {getStatusLabel(project.status)}
          </span>
        </div>

        <p>{project.description}</p>

        <div className="project-card__topics">
          {project.topics.map((techno) => (
            <span key={techno} className="project-card__topic">
              #{techno}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          <a href={project.url} target="_blank" rel="noreferrer">
            {t.projects.codeLink}
          </a>
          {project.homepageUrl && (
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__homepage"
            >
              Voir le site
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
