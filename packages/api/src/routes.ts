import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import securityApp from "@repo/api/security";
import secureApp from "@repo/api/secure";
import ordersApp from "@repo/api/orders";
import paymentMethodApp from "@repo/api/payment-method";
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
app.route("/payment-method", paymentMethodApp);
auth(app).route("/secure", secureApp);
auth(app).route("/orders", ordersApp);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const OPTIONS = handler;
export const HEAD = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;

export default app;
