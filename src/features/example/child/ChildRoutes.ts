import React from "react";
import { RouteConfig } from "../../../shared/types/routes";

const childOne = React.lazy(() => import("./ChildOne"));

export const childRoutes: RouteConfig[] = [
  {
    path: "childOne",
    element: childOne,
  },
];
