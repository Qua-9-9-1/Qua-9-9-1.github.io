import type { Project } from '../types/project';

export const ExternalProject: Project[] = [
  {
    name: 'Nodl',
    description: 'Web application for making visual designs',
    imageUrl: './projects/nodl.webp',
    homepageUrl: 'https://nodl.dev/',
    topics: [
      'typescript',
      'github-actions',
      'threejs',
      'vue',
      'vite',
      'shaders',
      'docker',
      'ci-cd',
    ],
    status: 'wip',
  },
];
