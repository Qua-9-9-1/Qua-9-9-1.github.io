import { lazy, Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';

const Contact = lazy(() => import('./pages/Contact'));
const NoContent = lazy(() => import('./pages/NoContent'));

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
        element: <Projects />,
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<div />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div />}>
            <NoContent />
          </Suspense>
        ),
      },
    ],
  },
]);
