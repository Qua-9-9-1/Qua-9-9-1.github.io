import type { Project } from '../types/project';

export const ExternalProject: Project[] = [
  {
    name: 'Nodl',
    description: 'Web application for making visual designs',
    imageUrl: './projects/nodl.webp',
    homepageUrl: 'https://nodl.dev/',
    topics: [
      'typescript',
      'threejs',
      'vue',
      'vite',
      'vitest',
      'shaders',
      'docker',
      'caddy',
      'ci-cd',
      'mobile',
    ],
    status: 'wip',
  },
];
