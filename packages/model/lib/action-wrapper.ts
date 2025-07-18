import { z } from "zod";

export type Context = {
  tenantId: string;
  user: { id: string; role: string };
};

export type Middleware = (ctx: Context) => Promise<void>;

export type ActionConfig<Input = any> = {
  input?: z.Schema<Input>;
  middlewares?: Middleware[];
};

export function action<Input = any, Output = any>(config: ActionConfig<Input>) {
  return (
    handler: (ctx: Context, input: Input) => Promise<Output>,
  ): ((input: unknown) => Promise<Output>) => {
    return async (rawInput: unknown): Promise<Output> => {
      const input = config.input
        ? config.input.parse(rawInput)
        : (rawInput as Input);

      const ctx: Context = {
        user: {
          id: "",
          role: "",
        },
        tenantId: "",
      };

      for (const middleware of config.middlewares || []) {
        await middleware(ctx);
      }

      return await handler(ctx, input);
    };
  };
}
