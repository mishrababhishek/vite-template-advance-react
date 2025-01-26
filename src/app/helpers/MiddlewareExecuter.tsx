import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { MiddlewareFunction } from "@shared/types/routes";
import { useNavigate } from "react-router-dom";

class MiddlewareService {
  private middlewares?: MiddlewareFunction[];
  private navigate: ReturnType<typeof useNavigate>;

  constructor(middlewares: MiddlewareFunction[] | undefined, navigate: ReturnType<typeof useNavigate>) {
    this.middlewares = middlewares;
    this.navigate = navigate;
  }

  public async executeAll(): Promise<boolean> {
    if (!this.middlewares) return true;
    for (const middleware of this.middlewares) {
      const result = await middleware({ navigate: this.navigate });
      if (!result) return false;
    }
    return true;
  }
}

type MiddlewareExecuterProps = PropsWithChildren<{
  middlewares?: MiddlewareFunction[];
}>;

const MiddlewareExecuter = ({ middlewares, children }: MiddlewareExecuterProps) => {
  const [isPassed, setIsPassed] = useState(false);
  const navigate = useNavigate();

  const executeMiddlewares = useCallback(async () => {
    const middlewareService = new MiddlewareService(middlewares, navigate);
    return middlewareService.executeAll();
  }, [middlewares, navigate]);

  useEffect(() => {
    const init = async () => {
      const result = await executeMiddlewares();
      setIsPassed(result);
    };
    init();
  }, [executeMiddlewares]);

  return isPassed ? <>{children}</> : null;
};

export default MiddlewareExecuter;
