import { lazy } from "react";
import SuspenseComp from "../components/Suspense/SuspenseComp";
import { RouterInterface, RouterPath } from "./routerPath.routes";

// ACHIEVE: Lazy loading to reduce compiler run time size
const Home = lazy(() => import("../pages/Home/Home"));

export const ListRouter: RouterInterface[] = [
  {
    component: (
      <SuspenseComp>
        <Home />
      </SuspenseComp>
    ),
    path: RouterPath.HOME,
  },
];
