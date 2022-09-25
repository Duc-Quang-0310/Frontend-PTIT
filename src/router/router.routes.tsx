import { lazy } from 'react';
import SuspenseComp from '../components/Suspense/SuspenseComp';
import { RouterInterface } from 'types/router.model';
import { routerPaths } from './router.paths';

// ACHIEVE: Lazy loading to reduce compiler run time size
const Home = lazy(() => import('../pages/Home/Home'));

export const listRouters: RouterInterface[] = [
  {
    component: <SuspenseComp child={<Home />} />,
    path: routerPaths.HOME
  }
];
