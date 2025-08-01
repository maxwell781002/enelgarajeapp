import { getCurrentUser } from "@repo/model/repository/user";
import { Context, createApp } from "@repo/model/lib/action/index";
import { SecurityUser } from "@repo/model/lib/auth";

export type AuthContext = {
  user: SecurityUser;
};

const auth = async (ctx: Context, next: any) => {
  const user = await getCurrentUser();
  return next({ ...ctx, user });
};

export type AppContext<T = any> = Context<T> & AuthContext;

const app = createApp<AppContext>();
app.use(auth);

export default app;
