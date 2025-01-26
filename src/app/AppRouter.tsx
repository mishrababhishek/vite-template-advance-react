import { RouteObject, useRoutes } from "react-router-dom";
import { RouteConfig } from "@shared/types/routes";
import WrapWithLayout from "./helpers/WrapWithLayout";
import MiddlewareExecuter from "./helpers/MiddlewareExecuter";
import { ExampleRoutes } from "../features/example/ExampleRoutes";

const routes: RouteConfig[] = [...ExampleRoutes];

const createRoute = (route: RouteConfig): RouteObject => {
  return {
    path: route.path,
    element: (
      <MiddlewareExecuter middlewares={route.middlewares}>
        <WrapWithLayout element={route.element} layout={route.layout} />
      </MiddlewareExecuter>
    ),
    children: !!route.children ? route.children.map((childRoute) => createRoute(childRoute)) : undefined,
  };
};

const AppRouter = () => {
  const appRoutes = useRoutes(routes.map((route) => createRoute(route)));
  return appRoutes;
};

export default AppRouter;
