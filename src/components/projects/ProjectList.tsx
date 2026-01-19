import type { Project } from '../../types/project';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
