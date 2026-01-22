import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Project } from '../types/project';
import { fetchGitHubProjects } from '../services/github';
import { ExternalProject } from '../data/externalProjects';

const formatPortfolioProjects = (projects: Project[]): Project[] => {
  return projects.map((project) =>
    project.name === 'Qua-9-9-1.github.io'
      ? { ...project, name: 'My portfolio' }
      : project
  );
};

type ProjectsContextValue = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadProjects = async () => {
      try {
        const data = await fetchGitHubProjects();
        const formattedData = formatPortfolioProjects(data);
        if (!active) return;
        setProjects([...ExternalProject, ...formattedData]);
      } catch (err) {
        if (!active) return;
        setError('Impossible to load projects from GitHub.');
        console.error(err);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };
    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ projects, loading, error }), [projects, loading, error]);
  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjectsContext() {
  return useContext(ProjectsContext);
}
