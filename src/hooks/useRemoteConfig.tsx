import { useState, useEffect } from 'react';
import { useRemoteConfigContext } from '../context/RemoteConfigContext';
import {
  type Config,
  loadingConfig,
  fallbackConfig,
} from '../types/remoteConfig';

const CONFIG_URL =
  'https://gist.githubusercontent.com/Qua-9-9-1/2b708f831600070a9336a400b41407b9/raw/portfolio.config.json';

export function useRemoteConfig() {
  const ctx = useRemoteConfigContext?.();
  const [config, setConfig] = useState<Config>(loadingConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ctx) return;

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

  if (ctx) return ctx;

  return { config, loading };
}
