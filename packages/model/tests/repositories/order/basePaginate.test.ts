import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  userFactory,
} from "../../factories";
import { orderRepository } from "../../../repositories/order";
import { OrderStatus } from "../../../prisma/generated/client";

const status = OrderStatus.PAYED;

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("OrderRepository basePaginate", () => {
  let business;
  let order1;
  let order2;
  let user;

  beforeAll(async () => {
    business = await businessFactory({ slug: "http://localhost:3000" });
    user = await userFactory();
    order1 = await orderFactory({
      userId: user.id,
      businessId: business.id,
      status,
    });
    order2 = await orderFactory({
      userId: user.id,
      businessId: business.id,
      changedByOrderId: order1.id,
      status,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const orders = await orderRepository.basePaginate({
      businessId: business.id,
      status,
    });
    expect(orders.data.length).toEqual(1);
    expect(orders.data[0].id).toEqual(order1.id);
  });
});
