import { useRemoteConfigContext } from '../context/RemoteConfigContext';

export function useRemoteConfig() {
  const ctx = useRemoteConfigContext();
  if (!ctx) {
    throw new Error('useRemoteConfig must be used within RemoteConfigProvider');
  }
  return ctx;
}
