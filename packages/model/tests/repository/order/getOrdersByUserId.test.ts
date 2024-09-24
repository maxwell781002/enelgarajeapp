import { beforeAll, describe, expect, it, vi } from "vitest";
import { orderFactory, userFactory } from "../../factories";
import { OrderStatus } from "../../../prisma/generated/client";
import { getOrdersByUserId } from "../../../repository/order";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({ value: "" })),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("getOrdersByUserId", () => {
  let user1;
  let user2;

  beforeAll(async () => {
    user1 = await userFactory();
    user2 = await userFactory();
    await orderFactory({
      userId: user1.id,
      status: OrderStatus.SEND,
      identifier: "user1_1",
    });
    await orderFactory({ userId: user1.id, identifier: "user1_2" });
    await orderFactory({ userId: user2.id, identifier: "user2_1" });
  });

  it("getOrdersByUserId", async () => {
    const orders = await getOrdersByUserId(user1.id);
    expect(orders.length).toBe(1);
    expect(orders[0].identifier).toBe("user1_1");
  });

  it("getOrdersByUserId empty", async () => {
    const orders = await getOrdersByUserId(user2.id);
    expect(orders.length).toBe(0);
  });
});
