export type ThemeMode = 'light' | 'dark';
export type BgColorName = 'neutral' | 'stone' | 'zinc' | 'gray' | 'slate';

export interface ColorDuo {
  id: string;
  primary: string;
  secondary: string;
}

export interface BgOption {
  value: BgColorName;
  lightColor: string;
  darkColor: string;
}

interface Preset {
  id: string;
  mode: ThemeMode;
  bg: BgColorName;
  duoId: string;
}

export const BG_OPTIONS: BgOption[] = [
  {
    value: 'neutral',
    lightColor: 'oklch(1 0 0)',
    darkColor: 'oklch(0.145 0 0)',
  },
  {
    value: 'stone',
    lightColor: 'oklch(1 0 0)',
    darkColor: 'oklch(0.147 0.004 49.25)',
  },
  {
    value: 'slate',
    lightColor: 'oklch(1 0 0)',
    darkColor: 'oklch(0.129 0.042 264.695)',
  },
  {
    value: 'zinc',
    lightColor: 'oklch(0.95 0.01 264.695)',
    darkColor: 'oklch(0.18 0.01 264.695)',
  },
  {
    value: 'gray',
    lightColor: 'oklch(0.9 0.005 264.695)',
    darkColor: 'oklch(0.2 0.005 264.695)',
  },
];

export const DUOS: ColorDuo[] = [
  { id: 'azure', primary: '#0083f3', secondary: '#0a5da5' },
  { id: 'mint', primary: '#00c3a0', secondary: '#0a725f' },
  { id: 'roses', primary: '#f5364f', secondary: '#a23342' },
  { id: 'saffron', primary: '#f7b731', secondary: '#b0852a' },
  { id: 'coral', primary: '#f97f51', secondary: '#b5471f' },
  { id: 'lilac', primary: '#9b51e0', secondary: '#652d98' },
  { id: 'laser', primary: '#12cc22', secondary: '#287c25' },
  { id: 'mocha', primary: '#81653a', secondary: '#463722' },
  { id: 'gray', primary: '#8a8a8a', secondary: '#535353' },
];

export const PRESETS: Preset[] = [
  { id: 'Developer', mode: 'dark', bg: 'zinc', duoId: 'azure' },
  { id: 'Minimalist', mode: 'light', bg: 'neutral', duoId: 'azure' },
  { id: 'Midnight', mode: 'dark', bg: 'gray', duoId: 'lilac' },
  { id: 'Vampire', mode: 'dark', bg: 'slate', duoId: 'roses' },
  { id: 'Matrix', mode: 'dark', bg: 'neutral', duoId: 'laser' },
  { id: 'Coffee', mode: 'light', bg: 'slate', duoId: 'mocha' },
  { id: 'Owl', mode: 'dark', bg: 'stone', duoId: 'mint' },
  { id: 'ColorBlind', mode: 'light', bg: 'zinc', duoId: 'gray' },
  { id: 'Wooden', mode: 'dark', bg: 'stone', duoId: 'saffron' },
  { id: 'Vector', mode: 'light', bg: 'stone', duoId: 'coral' },
];
