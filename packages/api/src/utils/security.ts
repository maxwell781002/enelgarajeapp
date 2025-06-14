import { SecurityUser } from "@repo/model/lib/auth";
import { Context } from "hono";
import jwt from "jsonwebtoken";

export const getUserByToken = (c: Context) => {
  const token = c.req.header("Authorization")?.split(" ")[1] || "";
  return jwt.verify(token, process.env.AUTH_SECRET as string);
};

export const generateToken = (user: SecurityUser) => {
  return jwt.sign(user, process.env.AUTH_SECRET as string, { expiresIn: "1h" });
};
