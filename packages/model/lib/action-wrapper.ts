import { z } from "zod";

export type Context<Input = any> = {
  input: Input;
};

export type ActionConfig<Input = any> = {
  input?: z.Schema<Input>;
};

const validateAndCleanInput = <Input>(
  input: unknown,
  config: ActionConfig<Input>,
): Input => {
  if (input instanceof FormData) {
    return Object.fromEntries(input.entries()) as Input;
  }
  return config.input ? config.input.parse(input) : (input as Input);
};

export type Middleware = (ctx: Context, next: Middleware) => Promise<any>;
export type Action = (ctx: Context) => Promise<any>;

const middlewareRunner = (
  ctx: Context,
  currentMiddleware: Middleware,
  middleware: Middleware[],
  currentIndex: number,
) => {
  const next = (ctx: Context) =>
    middlewareRunner(
      ctx,
      middleware[currentIndex + 1]!,
      middleware,
      currentIndex + 1,
    );
  return currentMiddleware(ctx, next);
};

export function createApp() {
  const middleware: Middleware[] = [];
  function wrapper(config: any, handler?: Action) {
    if (typeof config === "function") {
      handler = config;
      config = {};
    }
    return (rawInput?: unknown) => {
      const input = validateAndCleanInput(rawInput, config);
      const ctx: Context = {
        input,
      };
      const middleware = [
        ...wrapper._middleware,
        (ctx: Context) => (handler as Action)(ctx),
      ];
      return middlewareRunner(ctx, middleware[0]!, middleware, 0);
    };
  }
  wrapper._middleware = middleware;
  wrapper.use = function (...middleware: Middleware[]) {
    this._middleware.push(...middleware);
  };

  return wrapper;
}
