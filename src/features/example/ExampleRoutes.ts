import React from "react";
import { RouteConfig } from "../../shared/types/routes";
import { childRoutes } from "./child/ChildRoutes";

const example = React.lazy(() => import("./Example"));

export const ExampleRoutes: RouteConfig[] = [
  {
    path: "/example",
    element: example,
    children: [...childRoutes],
  },
];
