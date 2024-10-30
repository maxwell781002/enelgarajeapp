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
import { OrderSend } from "../../lib/event-emitter/events";

describe("new-order", () => {
  let order;
  let business;
  let event;

  beforeAll(async () => {
    process.env.BOT_WEBHOOK_URL = "https://some.url";
    global.fetch = vi.fn();
    business = await businessFactory({
      sendOrderToWhatsapp: true,
    });
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
    event = new OrderSend(order);
  });

  afterAll(async () => {
    vi.clearAllMocks();
    await clearBd();
    process.env.BOT_WEBHOOK_URL = undefined;
  });

  it("no telegram configured", async () => {
    await sendOrderToTelegram(event);
    expect(global.fetch).toBeCalledTimes(1);
  });

  it("with telegram configured", async () => {
    await telegramBusinessFactory({
      businessId: business.id,
      groupId: "groupId",
    });
    await sendOrderToTelegram(event);
    expect(global.fetch).toBeCalledTimes(3);
  });
});
