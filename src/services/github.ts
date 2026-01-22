import type { Project, ProjectStatus } from '../types/project';

const USERNAME = 'Qua-9-9-1';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage_url: string;
  topics: string[];
  updated_at: string;
  default_branch: string;
}

export const fetchGitHubProjects = async (): Promise<Project[]> => {
  const response = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`
  );

  if (!response.ok) {
    throw new Error('Error fetching GitHub repositories');
  }

  const data: GitHubRepo[] = await response.json();

  return data
    .filter((repo) => repo.topics.includes('portfolio'))
    .map((repo) => {
      let status: ProjectStatus = 'unknown';
      if (repo.topics.includes('completed')) {
        status = 'completed';
      } else if (repo.topics.includes('archived')) {
        status = 'archived';
      } else if (repo.topics.includes('wip')) {
        status = 'wip';
      } else if (repo.topics.includes('stopped')) {
        status = 'stopped';
      }

      const imageUrl = `https://raw.githubusercontent.com/${USERNAME}/${repo.name}/${repo.default_branch}/cover.png`;

      return {
        id: repo.id,
        name: repo.name.replace(/_/g, ' '),
        description: repo.description,
        url: repo.html_url,
        homepageUrl: repo.homepage_url,
        topics: repo.topics.filter(
          (t) =>
            t !== 'portfolio' &&
            t !== 'completed' &&
            t !== 'wip' &&
            t !== 'archived'
        ),
        status,
        imageUrl,
      };
    })
    .sort((b, a) => a.id - b.id);
};
