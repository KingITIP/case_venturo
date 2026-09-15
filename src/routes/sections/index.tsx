import type { RouteObject } from 'react-router';

import { lazy } from 'react';

import { authRoutes } from './auth';
import { publicRoutes } from './public';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/module/core/features/error/pages/404'));

export const routesSection: RouteObject[] = [
  // Auth
  ...authRoutes,

  // Public (landing, build, login, editor) — mounted at '/'
  ...publicRoutes,

  // Dashboard (mounted at '/dashboard')
  ...dashboardRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
