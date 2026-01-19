import { useState, useEffect } from 'react';
import type { Project } from '../types/project';
import { fetchGitHubProjects } from '../services/github';
import { ExternalProject } from '../data/externalProjects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchGitHubProjects();
        setProjects([...ExternalProject, ...data]);
      } catch (err) {
        setError('Impossible to load projects from GitHub.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
};
