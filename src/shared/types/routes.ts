import { ComponentType, LazyExoticComponent } from "react";
import { NavigateFunction } from "react-router-dom";

type MiddlewareProps = { navigate: NavigateFunction };
type MiddlewareFunctionReturnType = Promise<boolean> | boolean;

export type MiddlewareFunction = (props: MiddlewareProps) => MiddlewareFunctionReturnType;

export type RouteConfig = {
  path: string;
  element: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  children?: RouteConfig[];
  middlewares?: MiddlewareFunction[];
};
