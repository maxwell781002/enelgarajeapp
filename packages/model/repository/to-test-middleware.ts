"use server";

import { action, Context } from "@repo/model/lib/action-wrapper";
import { z } from "zod";

export const simpleAction = action(async () => {
  console.log("simpleAction");
  return "hello world";
});

const schema = z.object({
  name: z.string(),
});

export const actionObject = action(
  { input: schema },
  async (ctx: Context<z.infer<typeof schema>>) => {
    console.log("actionObject", ctx.input);
    return "hello world";
  },
);

export const actionFormData = action(
  { input: schema },
  async (ctx: Context<z.infer<typeof schema>>) => {
    console.log("actionFormData", ctx.input);
    return "hello world";
  },
);
