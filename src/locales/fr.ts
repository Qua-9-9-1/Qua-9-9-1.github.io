import { home_fr } from './pages/home/fr';
import { nav_fr } from './navbar/fr';
import { theme_fr } from './theme/fr';
import { projects_fr } from './pages/projects/fr';
import { contact_fr } from './pages/contact/fr';

export const fr = {
  home: home_fr,
  nav: nav_fr,
  theme: theme_fr,
  loading: 'Chargement...',
  projects: projects_fr,
  contact: contact_fr,
};

export type Translations = typeof fr;
