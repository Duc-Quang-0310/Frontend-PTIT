import { RouterInterface } from 'types/router.model';
import { lazy } from 'react';
import SuspenseComp from '../components/Suspense/SuspenseComp';
import { routerPaths } from './router.paths';

// ACHIEVE: Lazy loading to reduce compiler run time size
const Home = lazy(() => import('../pages/Home/Home'));
const LaptopDetail = lazy(() => import('../pages/ProductDetail/LaptopDetail'));
const UserProfile = lazy(() => import('../pages/profile/UserProfile'));

export const listRouters: RouterInterface[] = [
  {
    component: <SuspenseComp child={<Home />} />,
    path: routerPaths.HOME
  },
  {
    component: <SuspenseComp child={<LaptopDetail />} />,
    path: routerPaths.LAPTOP_DETAIL()
  },
  {
    component: <SuspenseComp child={<UserProfile />} />,
    path: routerPaths.USER_PROFILE()
  }
];
