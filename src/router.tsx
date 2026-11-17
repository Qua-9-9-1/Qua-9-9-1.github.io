import { lazy, Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import LoadingContent from './components/home/LoadingContent';
import { loadContact, loadNoContent, loadProjects } from './lib/routePreload';

const Projects = lazy(loadProjects);
const Contact = lazy(loadContact);
const NoContent = lazy(loadNoContent);

const pageFallback = (
  <div className="flex w-full flex-1 items-center justify-center py-24">
    <LoadingContent />
  </div>
);

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={pageFallback}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={pageFallback}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={pageFallback}>
            <NoContent />
          </Suspense>
        ),
      },
    ],
  },
]);
