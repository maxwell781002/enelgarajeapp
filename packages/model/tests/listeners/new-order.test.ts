import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  productFactory,
  productOrderFactory,
  telegramBusinessFactory,
  userFactory,
} from "../factories";
import { sendOrderToTelegram } from "../../listeners/new-order";

describe("new-order", () => {
  let order;
  let business;

  beforeAll(async () => {
    process.env.BOT_WEBHOOK_URL = "https://some.url";
    global.fetch = vi.fn();
    business = await businessFactory();
    const user = await userFactory({
      name: "Pepe",
      phone: "+5353024637",
    });
    const product = await productFactory({ businessId: business.id });
    order = await orderFactory({ businessId: business.id, userId: user.id });
    await productOrderFactory({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      price: 100,
      position: 0,
    });
  });

  afterAll(async () => {
    vi.clearAllMocks();
    await clearBd();
    process.env.BOT_WEBHOOK_URL = undefined;
  });

  it("no telegram configured", async () => {
    await sendOrderToTelegram(order);
    expect(global.fetch).toBeCalledTimes(0);
  });

  it("with telegram configured", async () => {
    await telegramBusinessFactory({
      businessId: business.id,
      groupId: "groupId",
    });
    await sendOrderToTelegram(order);
    expect(global.fetch).toBeCalledTimes(1);
  });
});
