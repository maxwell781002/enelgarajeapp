import { getCurrentUser } from "@repo/model/repository/user";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { Context, createApp } from "@repo/model/lib/action/index";
import { SecurityUser } from "@repo/model/lib/auth";
import { CompleteBusiness } from "@repo/model/prisma/zod/business";

export type AuthContext = {
  user: SecurityUser;
};

export type BusinessContext = {
  business: CompleteBusiness;
};

const auth = async (ctx: Context, next: any) => {
  const user = await getCurrentUser();
  return next({ ...ctx, user });
};

const web = async (ctx: Context, next: any) => {
  const business = getCurrentBusiness();
  return next({ ...ctx, business });
};

export type AppContext<T = any> = Context<T> & AuthContext;

export const app = createApp<AppContext>();
app.use(auth);

export type WebContext<T = any> = Context<T> & AuthContext & BusinessContext;
export const appWeb = createApp<WebContext>();
appWeb.use(web);
