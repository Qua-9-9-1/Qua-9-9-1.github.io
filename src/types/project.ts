export type ProjectStatus = 'wip' | 'completed' | 'archived' | 'unknown';

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
