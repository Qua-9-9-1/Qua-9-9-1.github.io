import { useState, useEffect } from 'react';
import type { Project } from '../types/project';
import { fetchGitHubProjects } from '../services/github';
import { ExternalProject } from '../data/externalProjects';
import { useProjectsContext } from '../context/ProjectsContext';

const formatPortfolioProjects = (projects: Project[]): Project[] => {
  return projects.map((project) =>
    project.name === 'Qua-9-9-1.github.io'
      ? { ...project, name: 'My portfolio' }
      : project
  );
};

export const useProjects = () => {
  const ctx = useProjectsContext?.();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ctx) return;

    const loadProjects = async () => {
      try {
        const data = await fetchGitHubProjects();
        const formattedData = formatPortfolioProjects(data);
        setProjects([...ExternalProject, ...formattedData]);
      } catch (err) {
        setError('Impossible to load projects from GitHub.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [ctx]);

  if (ctx) return ctx;

  return { projects, loading, error };
};
