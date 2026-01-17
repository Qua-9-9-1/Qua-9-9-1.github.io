import { label } from 'three/tsl';
import type { Translations } from './fr';

export const en: Translations = {
  home: {
    title: 'Welcome to my Portfolio',
    subtitle: 'Testing english subtitles',
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
          label: 'Gaming',
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
  },
  nav: {
    projects: 'Projects',
    contact: 'Contact',
  },
  loading: "Loading...",
  theme: {
    modalTitle: 'Appearance',
    modeLabel: 'Brightness',
    bgLabel: 'Background',
    duoLabel: 'Color',
    presetsLabel: 'Presets',
    lightLabel: 'Light',
    darkLabel: 'Dark',
  },
  projects: {
    loading: 'Loading projects...',
    loadingError: 'Trouble loading projects: ',
    title: 'My Projects',
    NoDescription: 'No description available.',
    codeLink: 'View Code',
    completed: 'Completed',
    wip: 'Work in Progress',
    archived: 'Archived',
    unknown: 'Unknown Status',
  },
  contact: {
    title: 'Contact Me',
  },
};
