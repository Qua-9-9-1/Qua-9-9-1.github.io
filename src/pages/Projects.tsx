import { useProjects } from '../hooks/useGithubProjects';
import { useLanguage } from '../context/LanguageContext';
import ProjectList from '../components/projects/ProjectList';
import LoadingContent from '../components/home/LoadingContent';

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const { t } = useLanguage();

  if (loading) return <LoadingContent />;
  if (error)
    return (
      <div>
        {t.projects.loadingError} {error}
      </div>
    );

  return <ProjectList projects={projects} />;
}
