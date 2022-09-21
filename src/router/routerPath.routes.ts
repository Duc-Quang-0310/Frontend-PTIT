import { ReactElement } from "react";

export const RouterPath = {
  HOME: "",
};

export interface RouterInterface {
  path: string;
  component: ReactElement;
}
