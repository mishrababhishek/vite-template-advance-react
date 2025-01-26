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

const LazyWrapper = ({ component: Component, fallback, children }: LazyWrapperProps) => {
  if (isLazyComponent(Component)) {
    return (
      <Suspense fallback={fallback}>
        <Component>{children}</Component>
      </Suspense>
    );
  }
  return <Component>{children}</Component>;
};

type WrapWithLayoutProps = {
  element: RouteConfig["element"];
  layout?: RouteConfig["layout"];
};

const WrapWithLayout = ({ element: Element, layout: Layout }: WrapWithLayoutProps) => {
  const elementFallback = <div>Loading Component...</div>;
  const layoutFallback = <div>Loading Layout...</div>;

  return Layout ? (
    <LazyWrapper component={Layout} fallback={layoutFallback}>
      <LazyWrapper component={Element} fallback={elementFallback} />
    </LazyWrapper>
  ) : (
    <LazyWrapper component={Element} fallback={elementFallback} />
  );
};

export default WrapWithLayout;
