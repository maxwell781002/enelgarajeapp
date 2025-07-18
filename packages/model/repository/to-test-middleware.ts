"use server";

import { action, Context } from "@repo/model/lib/action-wrapper";

// export const toTestMiddleware = async () => {
//   console.log("toTestMiddleware");
//   return 'hello world';
// }

export const toTestMiddleware = action({})(async (ctx: Context, input: any) => {
  console.log("toTestMiddleware", ctx, input);
  return "hello world";
});
