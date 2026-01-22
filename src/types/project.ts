export type ProjectStatus = 'wip' | 'completed' | 'archived' | 'stopped' | 'unknown';

export interface Project {
  id?: number;
  name: string;
  description: string;
  url?: string;
  homepageUrl?: string;
  topics: string[];
  status: ProjectStatus;
  imageUrl: string;
}
