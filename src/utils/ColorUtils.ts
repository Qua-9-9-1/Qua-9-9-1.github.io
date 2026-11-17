export const adjustBrightness = (col: string, amt: number) => {
  let usePound = false;
  let r = 0,
    g = 0,
    b = 0;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  r = (num >> 16) + amt;
  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }
  b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }
  g = (num & 0x0000ff) + amt;
  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }
  return (
    (usePound ? '#' : '') +
    (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')
  );
};

export const generatePalette = (hex: string) => {
  return {
    main: hex,
    light: adjustBrightness(hex, 40),
    dark: adjustBrightness(hex, -40),
  };
};

/* ------------------------------------------------------------------ */
/* Contrast helpers (WCAG 2 relative luminance + OKLCH adjustments)    */
/* ------------------------------------------------------------------ */

type RGB = [number, number, number]; // 0..1, gamma-encoded sRGB

export function hexToRgb(hex: string): RGB {
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function rgbToHex([r, g, b]: RGB): string {
  const to = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

const toLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const fromLinear = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function rgbToOklch(rgb: RGB): [number, number, number] {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}

function oklchToRgbUnclamped(L: number, C: number, H: number): RGB {
  const A = C * Math.cos(H);
  const B = C * Math.sin(H);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

/** OKLCH → sRGB, reducing chroma until the colour fits in the sRGB gamut. */
function oklchToHex(L: number, C: number, H: number): string {
  let c = C;
  for (let i = 0; i < 60; i++) {
    const rgb = oklchToRgbUnclamped(L, c, H);
    if (rgb.every((v) => v >= -0.001 && v <= 1.001)) return rgbToHex(rgb);
    c *= 0.93;
  }
  return rgbToHex(oklchToRgbUnclamped(L, 0, H));
}

/**
 * Returns `hex` with its OKLCH lightness shifted (hue kept) just enough to
 * reach `target` contrast against `bg`. Unchanged if it already passes.
 */
export function ensureContrast(hex: string, bg: string, target = 4.5): string {
  if (contrastRatio(hex, bg) >= target) return hex;
  const [L, C, H] = rgbToOklch(hexToRgb(hex));
  const darken = relativeLuminance(bg) > 0.18;
  for (let step = 1; step <= 100; step++) {
    const nl = darken ? L - step * 0.01 : L + step * 0.01;
    if (nl <= 0 || nl >= 1) break;
    const candidate = oklchToHex(nl, C, H);
    if (contrastRatio(candidate, bg) >= target) return candidate;
  }
  return darken ? '#000000' : '#ffffff';
}

/** Black-ish or white text, whichever reads best on `bg`. */
export function readableOn(bg: string, dark = '#0b0b10', light = '#ffffff') {
  return contrastRatio(bg, light) >= contrastRatio(bg, dark) ? light : dark;
}
