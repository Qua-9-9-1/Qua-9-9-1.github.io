import { useState, useEffect } from 'react';

const CONFIG_URL =
  'https://gist.githubusercontent.com/Qua-9-9-1/2b708f831600070a9336a400b41407b9/raw/portfolio.config.json';

interface Config {
  github_user: string;
  username: string;
  pro_title: { fr: string; en: string };
  workingStatus: string;
  availabilityDate: { from: string; to: string };
  description: { fr: string; en: string };
}

const defaultConfig: Config = {
  github_user: 'Loading...',
  username: 'Quentin',
  pro_title: { fr: 'Développeur', en: 'Developer' },
  workingStatus: 'Available',
  availabilityDate: { from: '', to: '' },
  description: {
    fr: 'Loading...',
    en: 'Loading...',
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
        setLoading(false);
      });
    console.log('Fetching config from', CONFIG_URL);
    console.log('Current config:', config);
  }, []);

  return { config, loading };
}
