export const fr = {
  home: {
    title: 'Bienvenue sur mon Portfolio',
    pro_title: 'Développeur C++ / Devops',
    about: {
      title: 'À propos de moi',
      description:
        'Bonjour, je suis Quentin, Actuellement étudiant en 4ème année chez EPITECH Montpellier. ' +
        "Passionné par le développement bas niveau (C++ / Rust) et l'électronique / le hardware en général. " +
        "Je suis également à l'aise dans le développement web et les interfaces utilisateur. " +
        "Ainsi que dans le DevOps et l'administration système." +
        'Je suis naturellement autonome de par mes projets personnels, ' +
        "et habitué au travail en équipe grâce à mes expériences en entreprise et à l'école. " +
        "Je suis d'un naturel très curieux et aime particulièrement apprendre par la pratique.",
    },
    working_status: {
      title: 'Statut Professionnel',
      stage: 'En stage',
      looking_for_internship: "À la recherche d'un stage",
      employed: 'Employé',
      looking_for_job: "À la recherche d'un emploi",
      freelance_available: 'Disponible pour du freelance',
    },
    skills: {
      title: 'Compétences Techniques',
      description:
        "Voici un aperçu des technologies et compétences que j'ai acquises au fil de mes expériences professionnelles et personnelles.",
    },
    hobbies: {
      title: 'Mes Hobbies',
      description:
        "Pendant mon temps libre, j'aime diverses activités qui m'aident à me détendre et à rester créatif. " +
        'Voici quelques-uns de mes passe-temps favoris :',
      items: [
        {
          label: 'Développement',
          description:
            'Évidemment, coder et créer de nouveaux projets fait grandement partie de mes intérêts, ' +
            "j'aime plus particulièrement la programmation bas niveau et la conception d'interfaces.",
        },
        {
          label: 'Électronique',
          description:
            'Bidouiller des circuits et construire des dispositifs électroniques. ' +
            'Cela est directement lié à mon intérêt pour le hardware et les systèmes embarqués.',
        },
        {
          label: 'Jeux vidéo et Rétro Gaming',
          description:
            'Jouer à des jeux vidéo pour me détendre et me donner des défis. ' +
            "Cela m'a aidé à saisir les premiers concepts de l'informatique," +
            "et m'a grandement inspiré pour créer mes propres jeux.",
        },
        {
          label: 'Musique',
          description:
            'Écouter et essayer de produire de la musique avec mon clavier AKAI MPK Mini Plus, ' +
            "mais je suis plus en phase d'apprentissage que de production.",
        },
        {
          label: 'Dessin et design',
          description:
            "Dessiner et concevoir des interfaces, ce qui m'aide à améliorer mes compétences en UI/UX " +
            "(Je n'utilise plus vraiment ma tablette).",
        },
        {
          label: '3D (dev) et shaders',
          description:
            'Tester le rendu 3D et les shaders en utilisant principalement Three.js et GLSL. ' +
            "J'envisage d'apprendre la modélisation pour l'impression 3D.",
        },
        {
          label: 'Vidéos',
          description:
            'Créer et monter des vidéos, principalement pour ma chaîne YouTube, ' +
            "pas encore sur mes projets mais peut-être à l'avenir.",
        },
      ],
    },
  },
  nav: {
    menu: {
      pages: 'Pages',
      options: 'Options',
      home: 'Accueil',
      projects: 'Projets',
      contact: 'Contact',
    },
  },
  loading: 'Chargement...',
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
