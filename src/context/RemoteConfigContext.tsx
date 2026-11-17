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
const CACHE_KEY = 'portfolio-remote-config';

type RemoteConfigContextValue = {
  config: Config;
  loading: boolean;
};

const RemoteConfigContext = createContext<RemoteConfigContextValue | undefined>(
  undefined
);

function readCachedConfig(): Config | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Config) : null;
  } catch {
    return null;
  }
}

// The request starts as soon as this module is evaluated (in parallel with
// the first React render) instead of waiting for an effect after mount.
let configPromise: Promise<Config | null> | null = null;
function loadRemoteConfig(): Promise<Config | null> {
  if (!configPromise) {
    configPromise = fetch(`${CONFIG_URL}?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Config>;
      })
      .then((data) => {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {
          /* ignore */
        }
        return data;
      })
      .catch((err) => {
        console.error('Error loading config', err);
        return null;
      });
  }
  return configPromise;
}
if (typeof window !== 'undefined' && typeof fetch === 'function') {
  loadRemoteConfig();
}

export function RemoteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Stale-while-revalidate: show the last known config instantly on repeat
  // visits, then swap in the fresh one.
  const [cached] = useState(readCachedConfig);
  const [config, setConfig] = useState<Config>(cached ?? loadingConfig);
  const [loading, setLoading] = useState(cached === null);

  useEffect(() => {
    let active = true;
    loadRemoteConfig().then((data) => {
      if (!active) return;
      if (data) setConfig(data);
      else if (!cached) setConfig(fallbackConfig);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [cached]);

  const value = useMemo(() => ({ config, loading }), [config, loading]);
  return (
    <RemoteConfigContext.Provider value={value}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRemoteConfigContext() {
  return useContext(RemoteConfigContext);
}
