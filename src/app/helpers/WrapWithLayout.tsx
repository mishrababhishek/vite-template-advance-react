import { Suspense } from "react";
import { RouteConfig } from "@shared/types/routes";
import { ComponentType, LazyExoticComponent, ReactNode } from "react";

const isLazyComponent = (component: any): component is LazyExoticComponent<ComponentType<any>> => {
  return component && component.$$typeof === Symbol.for("react.lazy");
};

type LazyWrapperProps = {
  component: ComponentType<any> & { children?: ReactNode };
  fallback: ReactNode;
  children?: ReactNode;
};

const LazyWrapper = ({ component: Component, fallback }: LazyWrapperProps) => {
  if (isLazyComponent(Component)) {
    return (
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    );
  }
  return <Component />;
};

type WrapWithLayoutProps = {
  element: RouteConfig["element"];
};

const WrapWithLayout = ({ element: Element }: WrapWithLayoutProps) => {
  const elementFallback = <div>Loading Component...</div>;
  return <LazyWrapper component={Element} fallback={elementFallback} />;
};

export default WrapWithLayout;
