import type { Translations } from './fr';

export const en: Translations = {
  home: {
    title: 'Welcome to my Portfolio',
    pro_title: 'C++ / Devops Developer',
    about: {
      title: 'About Me',
      description:
        'Hello, I am Quentin, currently a 4th-year student at EPITECH Montpellier. Passionate about low-level development (C++ / Rust) and electronics / hardware in general. I am naturally autonomous through my personal projects and accustomed to teamwork thanks to my experiences in companies and at school. I am naturally very curious and particularly enjoy learning through practice.',
    },
    working_status: {
      title: 'Professional Status',
      stage: 'Internship',
      looking_for_internship: 'Looking for an internship',
      employed: 'Employed',
      looking_for_job: 'Looking for a job',
      freelance_available: 'Available for freelance',
    },
    skills: {
      title: 'Technical Skills',
      description:
        'Here is an overview of the technologies and skills I have acquired through my professional and personal experiences and that I have been able to use in ',
      categories: {
        programming: 'Languages',
        web: 'Web',
        devops: 'DevOps',
        tools: 'Tools',
        others: 'Others',
      },
      my_projects: 'my projects',
      check_on_web: 'Check on web',
    },
    hobbies: {
      title: 'My Hobbies',
      description:
        'In my free time, I enjoy various activities that help me relax and stay creative. Here are some of my favorite hobbies:',
      items: [
        {
          label: 'Development',
          description:
            'Of course, coding and creating new projects is a big part of what I like. I especially enjoy low-level programming and designing interfaces.',
        },
        {
          label: 'Electronics',
          description:
            'Tinkering with circuits and building electronic devices. That’s directly related to my interest in hardware and embedded systems.',
        },
        {
          label: 'Gaming & Retro Gaming',
          description:
            'Playing video games to relax and challenge myself. It has inspired me a lot to create my own games.',
        },
        {
          label: 'Music',
          description:
            'Listening to and trying to make music with my AKAI MPK Mini Plus keyboard, but I’m more in the learning phase than actually producing.',
        },
        {
          label: 'Drawing and design',
          description:
            'Drawing and designing interfaces, which helps me improve my UI/UX skills (I don’t really use my tablet anymore).',
        },
        {
          label: '3D (dev) and shaders',
          description:
            'Testing 3D rendering and shaders, mainly with Three.js and GLSL. I’m thinking about learning modeling for 3D printing.',
        },
        {
          label: 'Videos',
          description:
            'Creating and editing videos, mainly for my YouTube channel, not really about my projects yet but maybe in the future.',
        },
      ],
    },
    contact: 'My Contacts',
  },
  nav: {
    menu: {
      pages: 'Pages',
      options: 'Options',
      theme: 'Theme',
      home: 'Home',
      projects: 'Projects',
      contact: 'Contact',
    },
  },
  loading: 'Loading...',
  theme: {
    modalTitle: 'Appearance',
    modeLabel: 'Brightness',
    bg: {
      label: 'Background',
      neutral: 'Neutral',
      stone: 'Stone',
      slate: 'Slate',
      zinc: 'Zinc',
      gray: 'Gray',
    },
    duo: {
      label: 'Color',
      azure: 'Azure',
      mint: 'Mint',
      roses: 'Roses',
      saffron: 'Saffron',
      coral: 'Coral',
      lilac: 'Lilac',
      laser: 'Laser',
      mocha: 'Mocha',
      gray: 'Gray',
    },
    presets: {
      label: 'Presets',
      Developer: 'Developer',
      Minimalist: 'Minimalist',
      Midnight: 'Midnight',
      Vampire: 'Vampire',
      Matrix: 'Matrix',
      Owl: 'Owl',
      Vector: 'Vector',
      ColorBlind: 'ColorBlind',
      Wooden: 'Wooden',
      Coffee: 'Coffee',
    },
    lightLabel: 'Light',
    darkLabel: 'Dark',
  },
  projects: {
    loading: 'Loading projects...',
    loadingError: 'Trouble loading projects: ',
    title: 'My Projects',
    ballsInstructions: 'Drag the balls here to filter projects by category',
    categories: {
      all: 'All projects',
      filter: 'Projects that contains:',
      lowlevel: 'Low-level',
      highlevel: 'High-level',
      devops: 'DevOps',
      web: 'Web',
      embedded: 'Embedded',
      graphic: 'Graphic',
      game: 'Game Dev',
      ai: 'AI',
      mobile: 'Mobile',
      database: 'Database',
    },
    NoDescription: 'No description available.',
    codeLink: 'View Code',
    homepageLink: 'Visit Homepage',
    status: {
      completed: 'Completed',
      wip: 'Work in Progress',
      archived: 'Archived',
      unknown: 'Unknown Status',
    },
  },
  contact: {
    title: 'Contact Me',
  },
};
