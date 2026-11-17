import { useProjectsContext } from '../context/ProjectsContext';

export const useProjects = () => {
  const ctx = useProjectsContext();
  if (!ctx) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return ctx;
};
