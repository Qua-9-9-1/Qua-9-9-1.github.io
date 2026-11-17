// Route chunk loaders, shared by the router (React.lazy) and links (preload
// on hover/focus/touch so the page is usually ready when the click lands).
export const loadProjects = () => import('../pages/Projects');
export const loadContact = () => import('../pages/Contact');
export const loadNoContent = () => import('../pages/NoContent');

const preloaders: Record<string, () => Promise<unknown>> = {
  '/projects': loadProjects,
  '/contact': loadContact,
};

const done = new Set<string>();

export function preloadRoute(path: string) {
  const loader = preloaders[path];
  if (!loader || done.has(path)) return;
  done.add(path);
  loader().catch(() => done.delete(path));
}
