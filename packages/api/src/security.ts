import { Hono } from "hono";
import { getExternalSection } from "@repo/model/repository/external-section";
import { generateToken } from "@repo/api/utils/security";

const app = new Hono();

app.get("/token/:token", async (c) => {
  const token = c.req.param("token");
  const user = await getExternalSection(token);
  if (!user) {
    return c.json({ error: "Not found" }, 404);
  }
  return c.json({
    token: await generateToken(user),
    user,
  });
});

export default app;
