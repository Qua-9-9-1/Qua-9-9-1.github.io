export const TOPIC_TO_CATEGORY: Record<string, string> = {
  c: 'lowlevel',
  cpp: 'lowlevel',
  rust: 'lowlevel',
  assembly: 'lowlevel',

  ruby: 'highlevel',
  python: 'highlevel',
  typescript: 'highlevel',
  javascript: 'highlevel',
  haskell: 'highlevel',
  lua: 'highlevel',

  docker: 'devops',
  kubernetes: 'devops',
  'github-actions': 'devops',
  'ci-cd': 'devops',
  husky: 'devops',
  ansible: 'devops',
  semaphore: 'devops',
  azure: 'devops',
  aws: 'devops',

  react: 'web',
  nestjs: 'web',
  vue: 'web',
  angular: 'web',
  npm: 'web',
  yarn: 'web',
  vite: 'web',
  tailwindcss: 'web',
  graphql: 'web',
  supabase: 'web',
  firebase: 'web',

  arduino: 'embedded',
  esp32: 'embedded',
  platformio: 'embedded',
  wokwi: 'embedded',
  'raspberry-pi': 'embedded',

  threejs: 'graphic',
  rmagick: 'graphic',
  sfml: 'graphic',
  sdl2: 'graphic',
  gtkmm: 'graphic',
  shaders: 'graphic',

  unity: 'game',
  godot: 'game',
  'game-engine': 'game',

  'machine-learning': 'ai',
  'deep-learning': 'ai',

  'react-native': 'mobile',
  flutter: 'mobile',
  android: 'mobile',
  ios: 'mobile',
  mobile: 'mobile',

  mongodb: 'database',
  postgresql: 'database',
  mysql: 'database',
  sqlite: 'database',
};

/**
 * One distinct colour per category (balls of the physics filter + filter
 * chips). Mid-tone, saturated colours so a white label with an outline stays
 * readable on top of them.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  lowlevel: '#e5484d',
  highlevel: '#3e7bfa',
  devops: '#12a594',
  web: '#f5a524',
  embedded: '#30a46c',
  graphic: '#8e4ec6',
  game: '#e93d82',
  ai: '#5b5bd6',
  mobile: '#f76b15',
  database: '#0894b3',
};

export function getCategoryColor(category: string): string {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  // Unknown category: stable hue from a string hash (golden-angle spread).
  let h = 0;
  for (const c of category) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  // Comma syntax: understood by both CSS and THREE.Color.
  return `hsl(${Math.round((h * 137.508) % 360)}, 65%, 50%)`;
}
