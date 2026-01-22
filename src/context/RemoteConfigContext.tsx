import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

type RemoteConfigContextValue = {
  config: Config;
  loading: boolean;
};

const RemoteConfigContext = createContext<RemoteConfigContextValue | undefined>(
  undefined
);

export function RemoteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`${CONFIG_URL}?t=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading config', err);
        if (!active) return;
        setConfig(fallbackConfig);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ config, loading }), [config, loading]);
  return (
    <RemoteConfigContext.Provider value={value}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export function useRemoteConfigContext() {
  return useContext(RemoteConfigContext);
}
