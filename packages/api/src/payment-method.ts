import { Hono } from "hono";
import { Context } from "hono";
import { callbackPayment } from "@repo/payment-method/factory-payment-gateway";

const app = new Hono();

app.get("/callback", async (c: Context) => {
  return c.json({});
});

app.post("/callback/:id", async (c: Context) => {
  const body = await c.req.json();
  const result = await callbackPayment(c.req.param("id"), body);
  if (!result) {
    return c.json(
      {
        message: "Invalid signature",
      },
      400,
    );
  }
  return c.json({
    message: "Success",
  });
});

export default app;
