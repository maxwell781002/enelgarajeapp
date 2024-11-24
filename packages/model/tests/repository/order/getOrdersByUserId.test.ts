import { beforeAll, describe, expect, it, vi } from "vitest";
import { orderFactory, userFactory, businessFactory } from "../../factories";
import { OrderStatus } from "../../../prisma/generated/client";
import { orderRepository } from "../../../repositories/order";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({ value: "" })),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("getOrdersByUserIdAndBusiness", () => {
  let user1;
  let user2;
  let business;

  beforeAll(async () => {
    business = await businessFactory({});
    user1 = await userFactory();
    user2 = await userFactory();
    await orderFactory({
      userId: user1.id,
      status: OrderStatus.SEND,
      identifier: "user1_1",
      businessId: business.id,
    });
    await orderFactory({ userId: user1.id, identifier: "user1_2" });
    await orderFactory({ userId: user2.id, identifier: "user2_1" });
  });

  it("getOrdersByUserIdAndBusiness", async () => {
    const orders = await orderRepository.getByBusinessAndUser(
      user1.id,
      business.id,
    );
    expect(orders.length).toBe(1);
    expect(orders[0].identifier).toBe("user1_1");
  });

  it("getOrdersByUserIdAndBusiness empty", async () => {
    const orders = await orderRepository.getByBusinessAndUser(
      user2.id,
      business.id,
    );
    expect(orders.length).toBe(0);
  });
});
