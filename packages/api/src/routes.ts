import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import securityApp from "@repo/api/security";
import secureApp from "@repo/api/secure";
export const dynamic = "force-dynamic";
import type { JwtVariables } from "hono/jwt";
import { auth } from "@repo/api/utils/security";

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.use("/*", cors({ origin: "*" }));

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono on Vercel!",
  });
});

app.route("/security", securityApp);
auth(app).route("/secure", secureApp);

export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);
export const HEAD = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export default app;
