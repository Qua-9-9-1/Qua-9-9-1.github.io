import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode, BgColorName, ColorDuo } from '../data/themeOptions';
import { DUOS, PRESETS } from '../data/themeOptions';
import { generatePalette } from '../utils/colorUtils';

interface ThemeState {
  mode: ThemeMode;
  bg: BgColorName;
  duo: ColorDuo;
}

interface ThemeContextType {
  theme: ThemeState;
  setMode: (mode: ThemeMode) => void;
  setBg: (bg: BgColorName) => void;
  setDuo: (duoId: string) => void;
  applyPreset: (presetName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_CSS_MAP: Record<BgColorName, string> = {
  neutral: new URL('../styles/themes/neutral.css', import.meta.url).href,
  stone: new URL('../styles/themes/stone.css', import.meta.url).href,
  zinc: new URL('../styles/themes/zinc.css', import.meta.url).href,
  gray: new URL('../styles/themes/gray.css', import.meta.url).href,
  slate: new URL('../styles/themes/slate.css', import.meta.url).href,
};

function applyThemeCss(bg: BgColorName) {
  const href = THEME_CSS_MAP[bg];
  const id = 'theme-file';
  let link = document.getElementById(id) as HTMLLinkElement | null;

  if (href) {
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = href;
  } else {
    if (link) link.remove();
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getSystemTheme = (): ThemeMode =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const [theme, setTheme] = useState<ThemeState>(() => {
    const saved = localStorage.getItem('portfolio-theme-params');
    if (saved) return JSON.parse(saved);
    // Si pas de sauvegarde, utilise le thème système
    return {
      mode: getSystemTheme(),
      bg: 'neutral',
      duo: DUOS[0],
    };
  });

  useEffect(() => {
    const root = document.documentElement;
    const primaryPal = generatePalette(theme.duo.primary);
    const secondaryPal = generatePalette(theme.duo.secondary);

    root.setAttribute('data-theme', theme.mode);
    root.setAttribute('data-bg', theme.bg);

    root.classList.toggle('dark', theme.mode === 'dark');

    applyThemeCss(theme.bg);

    root.style.setProperty('--primary-main', primaryPal.main);
    root.style.setProperty('--primary-light', primaryPal.light);
    root.style.setProperty('--primary-dark', primaryPal.dark);

    root.style.setProperty('--secondary-main', secondaryPal.main);
    root.style.setProperty('--secondary-light', secondaryPal.light);
    root.style.setProperty('--secondary-dark', secondaryPal.dark);

    localStorage.setItem('portfolio-theme-params', JSON.stringify(theme));
  }, [theme]);

  const setMode = (mode: ThemeMode) => setTheme((prev) => ({ ...prev, mode }));
  const setBg = (bg: BgColorName) => setTheme((prev) => ({ ...prev, bg }));

  const setDuo = (duoId: string) => {
    const selectedDuo = DUOS.find((d) => d.id === duoId);
    if (selectedDuo) setTheme((prev) => ({ ...prev, duo: selectedDuo }));
  };

  const applyPreset = (preset: string) => {
    const presetObj = PRESETS.find((p) => p.id === preset);
    if (!presetObj) return;
    const duo = DUOS.find((d) => d.id === presetObj.duoId) || DUOS[0];
    setTheme({
      mode: presetObj.mode,
      bg: presetObj.bg,
      duo,
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setMode, setBg, setDuo, applyPreset }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
