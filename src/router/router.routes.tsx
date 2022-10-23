import { RouterInterface } from 'types/router.model';
import { useAppSelector } from 'hooks/redux';
import { lazy } from 'react';
import SuspenseComp from '../components/Suspense/SuspenseComp';
import { routerPaths } from './router.paths';

// ACHIEVE: Lazy loading to reduce compiler run time size
const Home = lazy(() => import('../pages/Home/Home'));
const LaptopDetail = lazy(() => import('../pages/ProductDetail/LaptopDetail'));
const UserProfile = lazy(() => import('../pages/profile/UserProfile'));
const ProductList = lazy(() => import('../pages/ProductList/ProductList'));
const NotFound = lazy(() => import('../pages/404/NotFound'));

export const listRouters = (): RouterInterface[] => {
  const { profile } = useAppSelector((store) => store.auth);

  return [
    {
      component: <SuspenseComp child={<Home />} />,
      path: routerPaths.HOME
    },
    {
      component: <SuspenseComp child={<LaptopDetail />} />,
      path: routerPaths.LAPTOP_DETAIL()
    },
    {
      component: (
        <SuspenseComp child={profile ? <UserProfile /> : <NotFound />} />
      ),
      path: routerPaths.USER_PROFILE()
    },
    {
      component: <SuspenseComp child={<ProductList />} />,
      path: routerPaths.PRODUCT_LIST
    }
  ];
};
