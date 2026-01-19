export interface Skill {
    name: string;
    img: string;
    negative: boolean;
}

export const skills: Record<string, Skill[]> = {
    DevOps: [
        { name: "Ansible", img: "assets/techs/ansible.png", negative: true },
        { name: "BIND9", img: "assets/techs/bind9.png", negative: false },
        { name: "Docker", img: "assets/techs/docker.png", negative: false },
        { name: "Docker Compose", img: "assets/techs/docker-compose.png", negative: false },
        { name: "Kubernetes", img: "assets/techs/kubernetes.png", negative: false },
        { name: "Proxmox", img: "assets/techs/proxmox.png", negative: true },
        { name: "Traefik", img: "assets/techs/traefik.png", negative: false },
        { name: "Nginx", img: "assets/techs/nginx.png", negative: false },
        { name: "VMware", img: "assets/techs/vmware.png", negative: false },
    ],
    Programming: [
        { name: "C", img: "assets/techs/c.png", negative: false },
        { name: "C++", img: "assets/techs/cpp.png", negative: false },
        { name: "Haskell", img: "assets/techs/haskell.png", negative: false },
        { name: "PHP", img: "assets/techs/php.png", negative: false },
        { name: "Python", img: "assets/techs/python.png", negative: false },
        { name: "Rust", img: "assets/techs/rust.png", negative: true },
        { name: "Lua", img: "assets/techs/lua.png", negative: false },
        { name: "TypeScript and Javascript", img: "assets/techs/typescript.png", negative: false },
    ],
    Web: [
        { name: "React", img: "assets/techs/react.png", negative: false },
        { name: "Vue.js", img: "assets/techs/vue.png", negative: false },
        { name: "NestJS", img: "assets/techs/nestjs.png", negative: false },
        { name: "Node.js", img: "assets/techs/nodejs.png", negative: false },
        { name: "Npm", img: "assets/techs/npm.png", negative: false },
        { name: "Tailwind CSS", img: "assets/techs/tailwindcss.png", negative: false },
        { name: "Three.js", img: "assets/techs/threejs.png", negative: true },
        { name: "Tone.js", img: "assets/techs/tonejs.png", negative: false },
    ],
    Tools: [
        { name: "Git", img: "assets/techs/git.png", negative: false },
        { name: "GitHub", img: "assets/techs/github.png", negative: true },
        { name: "GitLab", img: "assets/techs/gitlab.png", negative: false },
        { name: "Postman", img: "assets/techs/postman.png", negative: false },
        { name: "VSCode", img: "assets/techs/vscode.png", negative: false },
        { name: "Vim", img: "assets/techs/vim.png", negative: false },
        { name: "WinSCP", img: "assets/techs/winscp.png", negative: false },
        { name: "WSL", img: "assets/techs/wsl.png", negative: false },
    ],
    Others: [
        { name: "Arch Linux", img: "assets/techs/archlinux.png", negative: false },
        { name: "Arduino", img: "assets/techs/arduino.png", negative: false },
        { name: "Bash", img: "assets/techs/bash.png", negative: false },
        { name: "Godot", img: "assets/techs/godot.png", negative: false },
        { name: "SFML", img: "assets/techs/sfml.png", negative: false },
        { name: "OpenGL", img: "assets/techs/opengl.png", negative: false },
        { name: "PostgreSQL", img: "assets/techs/postgresql.png", negative: false },
    ],
};