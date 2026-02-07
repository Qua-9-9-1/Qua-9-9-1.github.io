export interface Skill {
  name: string;
  img: string;
  negative: boolean;
}

export const skills: Record<string, Skill[]> = {
  DevOps: [
    { name: 'Ansible', img: 'techs/ansible.png', negative: true },
    { name: 'BIND9', img: 'techs/bind9.png', negative: false },
    { name: 'Docker', img: 'techs/docker.png', negative: false },
    { name: 'Kubernetes', img: 'techs/kubernetes.png', negative: false },
    { name: 'Proxmox', img: 'techs/proxmox.png', negative: true },
    { name: 'Traefik', img: 'techs/traefik.png', negative: false },
    { name: 'Nginx', img: 'techs/nginx.png', negative: false },
    { name: 'VMware', img: 'techs/vmware.png', negative: false },
  ],
  Programming: [
    { name: 'C++', img: 'techs/cpp.png', negative: false },
    { name: 'Haskell', img: 'techs/haskell.png', negative: false },
    { name: 'Python', img: 'techs/python.png', negative: false },
    { name: 'Rust', img: 'techs/rust.png', negative: true },
    { name: 'Lua', img: 'techs/lua.png', negative: false },
    {
      name: 'TypeScript and Javascript',
      img: 'techs/ts-js.png',
      negative: false,
    },
  ],
  Web: [
    { name: 'Electron', img: 'techs/electron.png', negative: false },
    { name: 'NestJS', img: 'techs/nestjs.png', negative: false },
    { name: 'Node.js', img: 'techs/nodejs.png', negative: false },
    { name: 'React', img: 'techs/react.png', negative: false },
    { name: 'Tailwind CSS', img: 'techs/tailwindcss.png', negative: false },
    { name: 'Three.js', img: 'techs/threejs.png', negative: true },
    { name: 'Tone.js', img: 'techs/tonejs.png', negative: false },
    { name: 'Vue.js', img: 'techs/vue.png', negative: false },
  ],
  Tools: [
    { name: 'Git', img: 'techs/git.png', negative: false },
    { name: 'GitHub', img: 'techs/github.png', negative: true },
    { name: 'GitLab', img: 'techs/gitlab.png', negative: false },
    { name: 'IntelliJ IDEA', img: 'techs/intellij.png', negative: false },
    { name: 'Postman', img: 'techs/postman.png', negative: false },
    { name: 'PHPStorm', img: 'techs/phpstorm.png', negative: false },
    { name: 'VSCode', img: 'techs/vscode.png', negative: false },
    { name: 'Vim', img: 'techs/vim.png', negative: false },
    { name: 'WinSCP', img: 'techs/winscp.png', negative: false },
    { name: 'WSL', img: 'techs/wsl.png', negative: false },
  ],
  Others: [
    { name: 'Arch Linux', img: 'techs/archlinux.png', negative: false },
    { name: 'Arduino', img: 'techs/arduino.png', negative: false },
    { name: 'Godot', img: 'techs/godot.png', negative: false },
    { name: 'OpenGL', img: 'techs/opengl.png', negative: false },
    { name: 'PostgreSQL', img: 'techs/postgresql.png', negative: false },
    { name: 'Prisma', img: 'techs/prisma.png', negative: true },
    { name: 'Raspberry Pi', img: 'techs/raspberrypi.png', negative: false },
    { name: 'WordPress', img: 'techs/wordpress.png', negative: true },
  ],
};
