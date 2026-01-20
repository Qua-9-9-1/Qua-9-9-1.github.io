import { home_fr } from './pages/home/fr';
import { layout_fr } from './layout/fr';
import { theme_fr } from './theme/fr';
import { projects_fr } from './pages/projects/fr';
import { contact_fr } from './pages/contact/fr';

export const fr = {
  lang: 'fr',
  home: home_fr,
  layout: layout_fr,
  theme: theme_fr,
  loading: 'Chargement...',
  projects: projects_fr,
  contact: contact_fr,
};

export type Translations = typeof fr;
