export const fr = {
  home: {
    title: 'Bienvenue sur mon Portfolio',
    subtitle: 'Test des sous-titres en français',
    hobbies: {
      title: 'Mes Hobbies',
      description:
        "Pendant mon temps libre, j'aime diverses activités qui m'aident à me détendre et à rester créatif. Voici quelques-uns de mes passe-temps favoris :",
      items: [
        {
          label: 'Développement',
          description:
            "Évidemment, coder et créer de nouveaux projets fait grandement partie de mes intérêts, j'aime plus particulièrement la programmation bas niveau et la conception d'interfaces.",
        },
        {
          label: 'Électronique',
          description:
            'Bidouiller des circuits et construire des dispositifs électroniques. Cela est directement lié à mon intérêt pour le hardware et les systèmes embarqués.',
        },
        {
          label: 'Jeux vidéo',
          description:
            "Jouer à des jeux vidéo pour me détendre et me donner des défis. Cela m'a grandement inspiré pour créer mes propres jeux.",
        },
        {
          label: 'Musique',
          description:
            "Écouter et essayer de produire de la musique avec mon clavier AKAI MPK Mini Plus, mais je suis plus en phase d'apprentissage que de production.",
        },
        {
          label: 'Dessin et design',
          description:
            "Dessiner et concevoir des interfaces, ce qui m'aide à améliorer mes compétences en UI/UX (Je n'utilise plus vraiment ma tablette).",
        },
        {
          label: '3D (dev) et shaders',
          description:
            "Tester le rendu 3D et les shaders en utilisant principalement Three.js et GLSL. J'envisage d'apprendre la modélisation pour l'impression 3D.",
        },
        {
          label: 'Vidéos',
          description:
            "Créer et monter des vidéos, principalement pour ma chaîne YouTube, pas encore sur mes projets mais peut-être à l'avenir.",
        },
      ],
    },
  },
  nav: {
    projects: 'Projets',
    contact: 'Contact',
  },
  theme: {
    modalTitle: 'Apparence',
    modeLabel: 'Luminosité',
    bgLabel: 'Fond',
    duoLabel: 'Couleur',
    presetsLabel: 'Presets',
    lightLabel: 'Clair',
    darkLabel: 'Sombre',
  },
  projects: {
    loading: 'Chargement des projets...',
    loadingError: 'Erreur lors du chargement : ',
    title: 'Mes projets',
    NoDescription: 'Aucune description disponible.',
    codeLink: 'Voir le code',
    completed: 'Terminé',
    wip: 'En cours',
    archived: 'Archivé',
    unknown: 'Statut inconnu',
  },
  contact: {
    title: 'Contactez-moi',
  },
};

export type Translations = typeof fr;
