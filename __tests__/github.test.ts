import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGitHubProjects } from '../src/services/github';

global.fetch = vi.fn();

describe('Service : fetchGitHubProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit filtrer et formater correctement les dépôts GitHub', async () => {
    const mockGitHubData = [
      {
        id: 1,
        name: 'Mon_Projet',
        description: 'Description test',
        html_url: 'https://github.com/Qua-9-9-1/Mon_Projet',
        homepage_url: '',
        topics: ['portfolio', 'completed', 'react'],
        default_branch: 'main',
      },
      {
        id: 2,
        name: 'Projet_Ignoré',
        topics: ['react'],
      }
    ];

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockGitHubData,
    });

    const projects = await fetchGitHubProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Mon Projet');
    expect(projects[0].status).toBe('completed');
    expect(projects[0].topics).toEqual(['react']);
  });

  it('doit lever une erreur si la requête échoue', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    await expect(fetchGitHubProjects()).rejects.toThrow('Error fetching GitHub repositories');
  });
});