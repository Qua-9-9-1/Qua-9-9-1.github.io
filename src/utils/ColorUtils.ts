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
