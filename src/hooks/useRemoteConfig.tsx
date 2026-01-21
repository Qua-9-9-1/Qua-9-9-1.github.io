import { useState, useEffect } from 'react';

const CONFIG_URL =
  'https://gist.githubusercontent.com/Qua-9-9-1/2b708f831600070a9336a400b41407b9/raw/portfolio.config.json';

interface Config {
  website_status: string;
  github_user: string;
  username: string;
  pro_title: { fr: string; en: string };
  working_status: string;
  availability_date: { from: string; to: string };
  description: { fr: string; en: string };
}

const defaultConfig: Config = {
  website_status: 'Available',
  github_user: '...',
  username: 'Quentin',
  pro_title: { fr: 'Chargement...', en: 'Loading...' },
  working_status: '...',
  availability_date: { from: '', to: '' },
  description: {
    fr: 'Chargement...',
    en: 'Loading...',
  },
};

const fallbackConfig: Config = {
  website_status: 'Available',
  github_user: 'Qua-9-9-1',
  username: 'Quentin',
  pro_title: { fr: 'Développeur', en: 'Developer' },
  working_status: 'Available',
  availability_date: { from: '', to: '' },
  description: {
    fr: 'Le chargement de la configuration a échoué.',
    en: 'Failed to load configuration.',
  },
};

export function useRemoteConfig() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${CONFIG_URL}?t=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading config', err);
        setConfig(fallbackConfig);
        setLoading(false);
      });
  }, []);

  return { config, loading };
}
