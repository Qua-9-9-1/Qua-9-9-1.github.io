import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type Config,
  loadingConfig,
  fallbackConfig,
} from '../types/remoteConfig';

const CONFIG_URL =
  'https://gist.githubusercontent.com/Qua-9-9-1/2b708f831600070a9336a400b41407b9/raw/portfolio.config.json';

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
  const [config, setConfig] = useState<Config>(loadingConfig);
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
