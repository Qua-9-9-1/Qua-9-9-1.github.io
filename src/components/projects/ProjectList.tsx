import type { Project } from '../../types/project';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}