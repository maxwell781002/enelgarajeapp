import { Hono } from "hono";
import { Context } from "hono";

const app = new Hono();

app.get("/", async (c: Context) => {
  const payload = c.get("jwtPayload");
  console.log("payload", payload);
  return c.json({
    message: `Hello from Hono on Vercel! You're now on /api/secure!`,
  });
});

app.get("/status", async (c: Context) => {
  const payload = c.get("jwtPayload");
  return c.json(payload);
});

export default app;
