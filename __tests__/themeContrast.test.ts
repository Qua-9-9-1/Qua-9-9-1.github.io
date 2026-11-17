import { describe, it, expect } from 'vitest';
import {
  DUOS,
  PRESETS,
  BG_OPTIONS,
  getThemeVars,
  buildThemeBootData,
} from '../src/data/themeOptions';
import { contrastRatio, ensureContrast } from '../src/utils/ColorUtils';

const SURFACES = { light: '#f1f1f3', dark: '#27272a' } as const;

describe('Theme colours', () => {
  for (const duo of DUOS) {
    for (const mode of ['light', 'dark'] as const) {
      it(`${duo.id} (${mode}) inks reach WCAG AA on the surface`, () => {
        const vars = getThemeVars(duo, mode);
        expect(
          contrastRatio(vars['--primary-ink'], SURFACES[mode])
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(vars['--secondary-ink'], SURFACES[mode])
        ).toBeGreaterThanOrEqual(4.5);
        // Text drawn on top of a solid primary / secondary fill.
        expect(
          contrastRatio(vars['--on-primary'], vars['--primary-ink'])
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(vars['--on-secondary'], vars['--secondary-ink'])
        ).toBeGreaterThanOrEqual(4.5);
      });
    }
  }

  it('keeps a colour untouched when it already passes', () => {
    expect(ensureContrast('#000000', '#ffffff')).toBe('#000000');
  });

  it('every preset references an existing duo and background', () => {
    for (const p of PRESETS) {
      expect(DUOS.some((d) => d.id === p.duoId)).toBe(true);
      expect(BG_OPTIONS.some((b) => b.value === p.bg)).toBe(true);
    }
    expect(PRESETS.some((p) => p.mode === 'light')).toBe(true);
    expect(PRESETS.some((p) => p.mode === 'dark')).toBe(true);
  });

  it('boot data covers every duo in both modes', () => {
    const data = buildThemeBootData();
    for (const duo of DUOS) {
      expect(data.vars[duo.id].light['--primary-ink']).toMatch(/^#/);
      expect(data.vars[duo.id].dark['--primary-ink']).toMatch(/^#/);
    }
  });
});
