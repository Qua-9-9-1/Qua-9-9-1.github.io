export type ThemeMode = 'light' | 'dark';
export type BgColorName = 'neutral' | 'stone'
| 'zinc' | 'gray' | 'slate';

export interface ColorDuo {
  id: string;
  primary: string;
  secondary: string;
  label: string;
}

export interface BgOption {
    value: BgColorName;
    label: string;
    lightColor: string;
    darkColor: string;
}

export const BG_OPTIONS: BgOption[] = [
  {
    value: 'neutral',
    label: 'Neutre',
    lightColor: 'oklch(1 0 0)',
    darkColor:  'oklch(0.145 0 0)',
  },
  {
    value: 'stone',
    label: 'Pierre',
    lightColor: 'oklch(1 0 0)',
    darkColor:  'oklch(0.147 0.004 49.25)',
  },
  {
    value: 'slate',
    label: 'Ardoise',
    lightColor: 'oklch(1 0 0)',
    darkColor:  'oklch(0.129 0.042 264.695)',
  },
  {
    value: 'zinc',
    label: 'Zinc',
    lightColor: 'oklch(0.95 0.01 264.695)',
    darkColor:  'oklch(0.18 0.01 264.695)',
    },
    {
    value: 'gray',
    label: 'Gris',
    lightColor: 'oklch(0.9 0.005 264.695)',
    darkColor:  'oklch(0.2 0.005 264.695)',
    },
];

export const DUOS: ColorDuo[] = [
{ id: 'azure', primary: '#0083f3', secondary: '#0a5da5', label: 'Azure' },
  { id: 'mint', primary: '#00c3a0', secondary: '#0a725f', label: 'Menthe' },
  { id: 'claret', primary: '#f5364f', secondary: '#a23342', label: 'Claret' },
  { id: 'saffron', primary: '#f7b731', secondary: '#b0852a', label: 'Safran' },
  { id: 'coral', primary: '#f97f51', secondary: '#b5471f', label: 'Corail' },
  { id: 'lilas', primary: '#9b51e0', secondary: '#652d98', label: 'Lilas' },
];
    
export const PRESETS = {
  'Minimalist': { mode: 'light', bg: 'neutral', duoId: 'azure' },
  'Midnight':   { mode: 'dark', bg: 'stone', duoId: 'mint' },
  'Vampire':    { mode: 'dark', bg: 'slate', duoId: 'claret' },
};