import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Project } from '../types/project';
import { fetchGitHubProjects } from '../services/github';
import { ExternalProject } from '../data/externalProjects';

const CACHE_KEY = 'portfolio-github-projects';

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

const ProjectsContext = createContext<ProjectsContextValue | undefined>(
  undefined
);

function readCachedProjects(): Project[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : null;
  } catch {
    return null;
  }
}

// Started at module evaluation so the GitHub API call runs in parallel with
// the first render (and is usually done before the user opens /projects).
let projectsPromise: Promise<Project[]> | null = null;
function loadProjects(): Promise<Project[]> {
  if (!projectsPromise) {
    projectsPromise = fetchGitHubProjects().then((data) => {
      const formatted = formatPortfolioProjects(data);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
      } catch {
        /* ignore */
      }
      return formatted;
    });
    // Avoid an "unhandled rejection" before a consumer attaches.
    projectsPromise.catch(() => {});
  }
  return projectsPromise;
}
if (typeof window !== 'undefined' && typeof fetch === 'function') {
  loadProjects();
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  // Stale-while-revalidate (also spares the 60 req/h unauthenticated quota).
  const [cached] = useState(readCachedProjects);
  const [projects, setProjects] = useState<Project[]>(() =>
    cached ? [...ExternalProject, ...cached] : []
  );
  const [loading, setLoading] = useState(cached === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadProjects()
      .then((data) => {
        if (!active) return;
        setProjects([...ExternalProject, ...data]);
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        if (!cached) setError('Impossible to load projects from GitHub.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [cached]);

  const value = useMemo(
    () => ({ projects, loading, error }),
    [projects, loading, error]
  );
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProjectsContext() {
  return useContext(ProjectsContext);
}
