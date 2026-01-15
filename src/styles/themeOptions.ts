export type ThemeMode = 'light' | 'dark';
export type BgColorName =
  | 'gray-light'
  | 'gray-dark'
  | 'bw-contrast'
  | 'blue-sat'
  | 'blue-desat'
  | 'red-sat'
  | 'red-desat'
  | 'mint-sat'
  | 'mint-desat'
  | 'yellow-sat'
  | 'yellow-desat'
  | 'orange-sat'
  | 'orange-desat'
  | 'rose-sat'
  | 'rose-desat';

export interface ColorDuo {
  id: string;
  primary: string;
  secondary: string;
  label: string;
}

export interface BgOption {
  value: BgColorName;
  lightColor: string;
  darkColor: string;
  label: string;
}

export const BG_OPTIONS: BgOption[] = [
  {
    value: 'gray-light',
    lightColor: '#f8fafc',
    darkColor: '#1e293b',
    label: 'Gris Clair',
  },
  {
    value: 'gray-dark',
    lightColor: '#1e293b',
    darkColor: '#f8fafc',
    label: 'Gris Foncé',
  },
  {
    value: 'bw-contrast',
    lightColor: '#000000',
    darkColor: '#ffffff',
    label: 'B&W Contrasté',
  },
  {
    value: 'blue-sat',
    lightColor: '#eff6ff',
    darkColor: '#020617',
    label: 'Bleu Saturé',
  },
  {
    value: 'blue-desat',
    lightColor: '#f1f5f9',
    darkColor: '#0f172a',
    label: 'Bleu Doux',
  },
];

export const DUOS: ColorDuo[] = [
  { id: 'azure', primary: '#0083f3', secondary: '#0a5da5', label: 'Azure' },
  { id: 'mint', primary: '#00c3a0', secondary: '#0a725f', label: 'Menthe' },
  { id: 'claret', primary: '#f5364f', secondary: '#a23342', label: 'Claret' },
  { id: 'saffron', primary: '#f7b731', secondary: '#b0852a', label: 'Safran' },
  { id: 'coral', primary: '#f97f51', secondary: '#b5471f', label: 'Corail' },
  { id: 'lilas', primary: '#9b51e0', secondary: '#652d98', label: 'Lilas' },
  {
    id: 'sonic&tails',
    primary: '#0958be',
    secondary: '#ec9a1e',
    label: 'Sonic & Tails',
  },
  { id: 'candy', primary: '#f162ff', secondary: '#ffd79d', label: 'Bonbon' },
  {
    id: 'sunset',
    primary: '#ff5e62',
    secondary: '#ff9966',
    label: 'Coucher de Soleil',
  },
  { id: 'glow', primary: '#79cbb8', secondary: '#500472', label: 'Glow' },
  { id: 'roses', primary: '#e52165', secondary: '#0d1137', label: 'Roses' },
];

export const PRESETS = {
  'Dev Mode': {
    mode: 'dark' as ThemeMode,
    bg: 'gray-light' as BgColorName,
    duoId: 'azure',
  },
  Nature: {
    mode: 'light' as ThemeMode,
    bg: 'mint-desat' as BgColorName,
    duoId: 'mint',
  },
  Vampire: {
    mode: 'dark' as ThemeMode,
    bg: 'bw-contrast' as BgColorName,
    duoId: 'claret',
  },
};
