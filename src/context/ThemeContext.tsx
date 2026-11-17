import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode, BgColorName, ColorDuo } from '../data/themeOptions';
import { BG_OPTIONS, DUOS, PRESETS, getThemeVars } from '../data/themeOptions';

interface ThemeState {
  mode: ThemeMode;
  bg: BgColorName;
  duo: ColorDuo;
}

interface ThemeContextType {
  theme: ThemeState;
  /** true while the visitor hasn't picked anything: random theme per visit */
  isRandom: boolean;
  setMode: (mode: ThemeMode) => void;
  setBg: (bg: BgColorName) => void;
  setDuo: (duoId: string) => void;
  applyPreset: (presetName: string) => void;
  /** Pick another random preset and go back to "random on each visit". */
  randomize: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Keep these keys in sync with the boot script in index.html.
/** Explicit visitor choice (persists across visits). */
const CHOICE_KEY = 'portfolio-theme-choice';
/** Theme of the current visit (random one or last change). */
const SESSION_KEY = 'portfolio-theme-session';
/** Pre-random-theme key: was saved automatically for everyone, ignore it. */
const LEGACY_KEY = 'portfolio-theme-params';

type StoredTheme = { mode: ThemeMode; bg: BgColorName; duoId: string };

const prefersDark = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;

function toState(stored: Partial<StoredTheme> | null): ThemeState | null {
  if (!stored) return null;
  const duo = DUOS.find((d) => d.id === stored.duoId);
  const bgOk = BG_OPTIONS.some((o) => o.value === stored.bg);
  if (!duo || !bgOk || (stored.mode !== 'dark' && stored.mode !== 'light'))
    return null;
  return { mode: stored.mode, bg: stored.bg as BgColorName, duo };
}

function read(storage: Storage | undefined, key: string): ThemeState | null {
  try {
    const raw = storage?.getItem(key);
    return raw ? toState(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function write(storage: Storage | undefined, key: string, theme: ThemeState) {
  try {
    const value: StoredTheme = {
      mode: theme.mode,
      bg: theme.bg,
      duoId: theme.duo.id,
    };
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode…) */
  }
}

function randomPreset(mode: ThemeMode, excludeDuo?: string): ThemeState {
  const pool = PRESETS.filter((p) => p.mode === mode && p.duoId !== excludeDuo);
  const preset = pool[Math.floor(Math.random() * pool.length)] ?? PRESETS[0];
  return toState(preset)!;
}

const safeLocal = () =>
  typeof localStorage !== 'undefined' ? localStorage : undefined;
const safeSession = () =>
  typeof sessionStorage !== 'undefined' ? sessionStorage : undefined;

function readInitial(): { theme: ThemeState; isRandom: boolean } {
  const choice = read(safeLocal(), CHOICE_KEY);
  if (choice) return { theme: choice, isRandom: false };
  // Normally set by the boot script in index.html before React starts.
  const session = read(safeSession(), SESSION_KEY);
  if (session) return { theme: session, isRandom: true };
  return {
    theme: randomPreset(prefersDark() ? 'dark' : 'light'),
    isRandom: true,
  };
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [initial] = useState(readInitial);
  const [theme, setTheme] = useState<ThemeState>(initial.theme);
  const [isRandom, setIsRandom] = useState(initial.isRandom);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.mode);
    root.setAttribute('data-bg', theme.bg);
    root.classList.toggle('dark', theme.mode === 'dark');
    root.style.colorScheme = theme.mode;
    for (const [k, v] of Object.entries(getThemeVars(theme.duo, theme.mode)))
      root.style.setProperty(k, v);

    write(safeSession(), SESSION_KEY, theme);
    try {
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // Explicit visitor choices are remembered for the next visits.
  const choose = useCallback((update: (prev: ThemeState) => ThemeState) => {
    setTheme((prev) => {
      const next = update(prev);
      write(safeLocal(), CHOICE_KEY, next);
      return next;
    });
    setIsRandom(false);
  }, []);

  const setMode = useCallback(
    (mode: ThemeMode) => choose((prev) => ({ ...prev, mode })),
    [choose]
  );
  const setBg = useCallback(
    (bg: BgColorName) => choose((prev) => ({ ...prev, bg })),
    [choose]
  );
  const setDuo = useCallback(
    (duoId: string) => {
      const selectedDuo = DUOS.find((d) => d.id === duoId);
      if (selectedDuo) choose((prev) => ({ ...prev, duo: selectedDuo }));
    },
    [choose]
  );
  const applyPreset = useCallback(
    (preset: string) => {
      const next = toState(PRESETS.find((p) => p.id === preset) ?? null);
      if (next) choose(() => next);
    },
    [choose]
  );

  const randomize = useCallback(() => {
    try {
      localStorage.removeItem(CHOICE_KEY);
    } catch {
      /* ignore */
    }
    setTheme((prev) => randomPreset(prev.mode, prev.duo.id));
    setIsRandom(true);
  }, []);

  const value = useMemo(
    () => ({ theme, isRandom, setMode, setBg, setDuo, applyPreset, randomize }),
    [theme, isRandom, setMode, setBg, setDuo, applyPreset, randomize]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
