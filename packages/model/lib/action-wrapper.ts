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

type Handler<Input = any, Output = any> = (
  input: Input,
  ctx: Context,
) => Promise<Output>;

const validateAndCleanInput = <Input>(
  input: unknown,
  config: ActionConfig<Input>,
): Input => {
  if (input instanceof FormData) {
    return Object.fromEntries(input.entries()) as Input;
  }
  return config.input ? config.input.parse(input) : (input as Input);
};

export function action<Input = any, Output = any>(
  config: ActionConfig<Input> | Handler<Input, Output>,
  handler?: Handler<Input, Output>,
) {
  if (typeof config === "function") {
    handler = config;
    config = {};
  }
  return async (rawInput: unknown): Promise<Output> => {
    const input = validateAndCleanInput(rawInput, config);
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

    return await (handler as Handler)(input, ctx);
  };
}
