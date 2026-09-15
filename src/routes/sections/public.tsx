import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { PublicLayout } from 'src/layouts/public';
import { SplashScreen } from 'src/shared/ui/loading-screen';

// ----------------------------------------------------------------------

const LandingPage = lazy(() => import('src/module/core/features/public/pages/landing'));
const BuildPage = lazy(() => import('src/module/core/features/public/pages/build'));
const LoginPage = lazy(() => import('src/module/core/features/public/pages/login'));
const EditorPage = lazy(() => import('src/module/core/features/public/pages/editor'));

// ----------------------------------------------------------------------

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PublicLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </PublicLayout>
    ),
    children: [
      { element: <LandingPage />, index: true },
      { path: 'build', element: <BuildPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: '/editor/:id',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <EditorPage />
      </Suspense>
    ),
  },
];
