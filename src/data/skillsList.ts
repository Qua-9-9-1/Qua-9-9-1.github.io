export interface Skill {
  name: string;
  negative: boolean;
}

export const skills: Record<string, Skill[]> = {
  DevOps: [
    { name: 'Ansible', negative: true },
    { name: 'BIND9', negative: false },
    { name: 'Docker', negative: false },
    { name: 'Kubernetes', negative: false },
    { name: 'Proxmox', negative: true },
    { name: 'Traefik', negative: false },
    { name: 'Nginx', negative: false },
    { name: 'VMware', negative: false },
    { name: 'Arch Linux', negative: false },
  ],
  Programming: [
    { name: 'C++', negative: false },
    { name: 'C#', negative: false },
    { name: 'Haskell', negative: false },
    { name: 'Python', negative: false },
    { name: 'Rust', negative: true },
    { name: 'Lua', negative: false },
    {
      name: 'TypeScript',
      negative: false,
    },
  ],
  Web: [
    { name: 'Electron', negative: false },
    { name: 'NestJS', negative: false },
    { name: 'Node.js', negative: false },
    { name: 'React', negative: false },
    { name: 'Tailwind CSS', negative: false },
    { name: 'Vue.js', negative: false },
    { name: 'Blazor', negative: false },
    { name: 'PostgreSQL', negative: false },
    { name: 'Prisma', negative: true },
    { name: '.NET', negative: false },
    { name: 'Vitest', negative: false },
    { name: 'Supabase', negative: false },
  ],
  Tools: [
    { name: 'Git', negative: false },
    { name: 'GitHub', negative: true },
    { name: 'GitLab', negative: false },
    { name: 'Husky', negative: false },
    { name: 'IntelliJ IDEA', negative: false },
    { name: 'Postman', negative: false },
    { name: 'PHPStorm', negative: false },
    { name: 'VSCode', negative: false },
    { name: 'Vim', negative: false },
    { name: 'WinSCP', negative: false },
    { name: 'WSL', negative: false },
  ],
  Hardware_And_Graphics: [
    { name: 'Arduino', negative: false },
    { name: 'Raspberry Pi', negative: false },
    { name: 'Godot', negative: false },
    { name: 'OpenGL', negative: false },
    { name: 'Three.js', negative: true },
    { name: 'Tone.js', negative: false },
    { name: 'KDE', negative: false },
  ],
};
