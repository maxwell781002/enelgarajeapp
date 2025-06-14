import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import securityApp from "@repo/api/security";
import { getUserByToken } from "@repo/api/utils/security";
export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

app.use("/*", cors({ origin: "*" }));

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono on Vercel!",
  });
});

app.get("/secure", async (c) => {
  const token = await getUserByToken(c);
  console.log(token);
  console.log(c.req.header("Authorization"));
  return c.json({
    message: `Hello from Hono on Vercel! You're now on /api/secure!`,
  });
});

app.route("/security", securityApp);

export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);
export const HEAD = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export default app;
