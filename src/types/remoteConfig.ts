export interface Config {
  website_status: string;
  github_user: string;
  username: string;
  pro_title: { fr: string; en: string };
  work: { status: string; from: string; to: string; details: { fr: string; en: string } };
  description: { fr: string; en: string };
}

export const loadingConfig: Config = {
  website_status: 'Available',
  github_user: '...',
  username: 'Quentin',
  pro_title: { fr: 'Chargement...', en: 'Loading...' },
  work: { status: 'Loading...', from: '', to: '', details: { fr: '', en: '' } },
  description: {
    fr: 'Chargement...',
    en: 'Loading...',
  },
};

export const fallbackConfig: Config = {
  website_status: 'Available',
  github_user: 'Qua-9-9-1',
  username: 'Quentin',
  pro_title: { fr: 'Développeur', en: 'Developer' },
  work: { status: 'Available', from: '', to: '', details: { fr: '', en: '' } },
  description: {
    fr: 'Le chargement de la configuration a échoué.',
    en: 'Failed to load configuration.',
  },
};