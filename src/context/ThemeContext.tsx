import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode, BgColorName, ColorDuo } from '../styles/themeOptions';
import { DUOS, PRESETS } from '../styles/themeOptions';
import { generatePalette } from '../utils/ColorUtils';

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
  applyPreset: (presetName: keyof typeof PRESETS) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const saved = localStorage.getItem('portfolio-theme-params');
    return saved
      ? JSON.parse(saved)
      : {
          mode: 'dark',
          bg: 'gray-light',
          duo: DUOS[0],
        };
  });

  useEffect(() => {
    const root = document.documentElement;
    const primaryPal = generatePalette(theme.duo.primary);
    const secondaryPal = generatePalette(theme.duo.secondary);

    root.setAttribute('data-theme', theme.mode);
    root.setAttribute('data-bg', theme.bg);

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

  const applyPreset = (name: keyof typeof PRESETS) => {
    const preset = PRESETS[name];
    const duo = DUOS.find((d) => d.id === preset.duoId) || DUOS[0];
    setTheme({ mode: preset.mode, bg: preset.bg, duo });
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
