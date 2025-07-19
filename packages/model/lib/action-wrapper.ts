import { z } from "zod";

export type Context<Input = any> = {
  tenantId: string;
  user: { id: string; role: string };
  input: Input;
};

export type ActionConfig<Input = any> = {
  input?: z.Schema<Input>;
};

type Handler<Input = any, Output = any> = (
  ctx: Context<Input>,
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
    const ctx: Context<Input> = {
      user: {
        id: "",
        role: "",
      },
      tenantId: "",
      input,
    };

    return (handler as Handler<Input, Output>)(ctx);
  };
}
