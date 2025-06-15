import { getOrdersByMessenger } from "@repo/model/repository/order";
import { Hono } from "hono";
import { Context } from "hono";

const app = new Hono();

app.get("/", async (c: Context) => {
  const user = c.get("jwtPayload");
  const orders = await getOrdersByMessenger(user.id);
  return c.json(orders);
});

export default app;
