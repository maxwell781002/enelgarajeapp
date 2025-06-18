import { SecurityUser } from "@repo/model/lib/auth";
import { jwt as HonoJwt, sign } from "hono/jwt";

export const generateToken = (user: SecurityUser) => {
  return sign(user as any, process.env.AUTH_SECRET as string);
};

export const auth = (app: any) =>
  app.use(
    "/*",
    HonoJwt({
      secret: process.env.AUTH_SECRET as string,
    }),
  );
