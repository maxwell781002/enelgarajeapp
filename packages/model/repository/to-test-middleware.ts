"use server";

import app, { AppContext } from "@repo/model/lib/action/app";
import { z } from "zod";

export const simpleAction = app(async (ctx: AppContext) => {
  console.log("simpleAction");
  return `hello simpleAction`;
});

const schema = z.object({
  name: z.string(),
});

export const actionObject = app(
  { input: schema },
  async (ctx: AppContext<z.infer<typeof schema>>) => {
    console.log("actionObject", ctx.input);
    return "hello actionObject";
  },
);

export const actionFormData = app(
  { input: schema },
  async (ctx: AppContext<z.infer<typeof schema>>) => {
    console.log("actionFormData", ctx.input);
    return "hello actionFormData";
  },
);

export const withLogging = app(async (ctx: AppContext) => {
  console.log(ctx);
  return "hello withLogging";
});
