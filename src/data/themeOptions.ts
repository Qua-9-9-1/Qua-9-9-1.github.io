import { ensureContrast, readableOn } from '../utils/ColorUtils';

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

export interface Preset {
  id: string;
  mode: ThemeMode;
  bg: BgColorName;
  duoId: string;
}

// Swatch colours shown in the theme modal (= --background of each theme file).
export const BG_OPTIONS: BgOption[] = [
  {
    value: 'neutral',
    lightColor: 'oklch(0.975 0 0)',
    darkColor: 'oklch(0.145 0 0)',
  },
  {
    value: 'stone',
    lightColor: 'oklch(0.975 0.006 75)',
    darkColor: 'oklch(0.147 0.004 49.25)',
  },
  {
    value: 'slate',
    lightColor: 'oklch(0.975 0.008 250)',
    darkColor: 'oklch(0.129 0.042 264.695)',
  },
  {
    value: 'zinc',
    lightColor: 'oklch(0.97 0.006 286)',
    darkColor: 'oklch(0.141 0.005 285.823)',
  },
  {
    value: 'gray',
    lightColor: 'oklch(0.955 0.006 264)',
    darkColor: 'oklch(0.13 0.028 261.692)',
  },
];

/**
 * Brand colour pairs. `primary` / `secondary` are the raw "identity"
 * colours, used for decoration (gradients, glows, hexagons, borders).
 * Text and solid fills use contrast-corrected variants, see getThemeVars.
 */
export const DUOS: ColorDuo[] = [
  { id: 'azure', primary: '#1d8cf8', secondary: '#0a5da5' },
  { id: 'mint', primary: '#00c3a0', secondary: '#0e7c69' },
  { id: 'roses', primary: '#f5364f', secondary: '#b02a48' },
  { id: 'saffron', primary: '#f7b731', secondary: '#e07b1a' },
  { id: 'coral', primary: '#f97f51', secondary: '#c2410c' },
  { id: 'lilac', primary: '#9b51e0', secondary: '#6d3fc0' },
  { id: 'laser', primary: '#22d32f', secondary: '#13863c' },
  { id: 'mocha', primary: '#a47a48', secondary: '#6b4f2e' },
  { id: 'gray', primary: '#8a8a8a', secondary: '#5b5b5b' },
  // Two-hue duos: nicer gradients.
  { id: 'synthwave', primary: '#ff4fd8', secondary: '#7b5cff' },
  { id: 'aurora', primary: '#2dd4bf', secondary: '#6366f1' },
  { id: 'sunset', primary: '#fb7185', secondary: '#f59e0b' },
];

export const PRESETS: Preset[] = [
  // Dark
  { id: 'Developer', mode: 'dark', bg: 'zinc', duoId: 'azure' },
  { id: 'Midnight', mode: 'dark', bg: 'slate', duoId: 'lilac' },
  { id: 'Vampire', mode: 'dark', bg: 'neutral', duoId: 'roses' },
  { id: 'Matrix', mode: 'dark', bg: 'neutral', duoId: 'laser' },
  { id: 'Owl', mode: 'dark', bg: 'stone', duoId: 'mint' },
  { id: 'Wooden', mode: 'dark', bg: 'stone', duoId: 'saffron' },
  { id: 'Synthwave', mode: 'dark', bg: 'slate', duoId: 'synthwave' },
  { id: 'Aurora', mode: 'dark', bg: 'zinc', duoId: 'aurora' },
  // Light
  { id: 'Minimalist', mode: 'light', bg: 'neutral', duoId: 'azure' },
  { id: 'Coffee', mode: 'light', bg: 'stone', duoId: 'mocha' },
  { id: 'ColorBlind', mode: 'light', bg: 'zinc', duoId: 'gray' },
  { id: 'Vector', mode: 'light', bg: 'stone', duoId: 'coral' },
  { id: 'Sunset', mode: 'light', bg: 'stone', duoId: 'sunset' },
  { id: 'Lagoon', mode: 'light', bg: 'slate', duoId: 'aurora' },
  { id: 'Sakura', mode: 'light', bg: 'neutral', duoId: 'roses' },
];

// Reference surfaces the coloured text has to read on (cards/backgrounds).
const LIGHT_SURFACE = '#f1f1f3';
const DARK_SURFACE = '#27272a';

/**
 * CSS custom properties for a duo in a given mode:
 *  --primary-main / --secondary-main : raw colours (decoration)
 *  --primary-ink / --secondary-ink   : same hue, ≥ 4.5:1 on the surfaces
 *  --on-primary / --on-secondary     : readable text on the ink colours
 */
export function getThemeVars(
  duo: ColorDuo,
  mode: ThemeMode
): Record<string, string> {
  const surface = mode === 'dark' ? DARK_SURFACE : LIGHT_SURFACE;
  const primaryInk = ensureContrast(duo.primary, surface, 4.5);
  const secondaryInk = ensureContrast(duo.secondary, surface, 4.5);
  return {
    '--primary-main': duo.primary,
    '--secondary-main': duo.secondary,
    '--primary-ink': primaryInk,
    '--secondary-ink': secondaryInk,
    '--on-primary': readableOn(primaryInk),
    '--on-secondary': readableOn(secondaryInk),
  };
}

/** Data injected into index.html (see vite.config.ts) for the boot script. */
export function buildThemeBootData() {
  const vars: Record<string, Record<ThemeMode, Record<string, string>>> = {};
  for (const duo of DUOS) {
    vars[duo.id] = {
      light: getThemeVars(duo, 'light'),
      dark: getThemeVars(duo, 'dark'),
    };
  }
  return {
    presets: PRESETS.map(({ id, mode, bg, duoId }) => ({
      id,
      mode,
      bg,
      duoId,
    })),
    vars,
  };
}
