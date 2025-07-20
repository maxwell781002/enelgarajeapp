"use server";

import { Context, createApp } from "@repo/model/lib/action-wrapper";
import { z } from "zod";

const logging = async (ctx: Context, next: any) => {
  console.log("logging", ctx);
  return next(ctx).then((result: any) => {
    console.log("logging result", result);
    return result;
  });
};

type AuthContext = Context & {
  user: any;
};

const auth = async (ctx: Context, next: any) => {
  return next({ ...ctx, user: "John Doe" } as AuthContext)
};

type TenantContext = Context & {
  tenantId: string;
}

const tenant = async (ctx: Context, next: any) => {
  return next({ ...ctx, tenantId: "1" } as TenantContext)
}

const app = createApp();
app.use(logging, auth, tenant);

export const simpleAction = app(async (ctx: TenantContext & AuthContext) => {
  console.log("simpleAction");
  return `hello simpleAction ${ctx.user} ${ctx.tenantId}`;
});

const schema = z.object({
  name: z.string(),
});

export const actionObject = app(
  { input: schema },
  async (ctx: Context<z.infer<typeof schema>>) => {
    console.log("actionObject", ctx.input);
    return "hello actionObject";
  },
);

export const actionFormData = app(
  { input: schema },
  async (ctx: Context<z.infer<typeof schema>>) => {
    console.log("actionFormData", ctx.input);
    return "hello actionFormData";
  },
);

export const withLogging = app(async () => {
  return "hello withLogging";
});
