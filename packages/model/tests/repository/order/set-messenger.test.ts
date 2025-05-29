import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { OrderStatus } from "../../../prisma/generated/client";
import { setMessengerToOrder } from "../../../repository/order";
import { UserBusinessType } from "../../../types/enums";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({ value: "" })),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("setMessengerToOrder", () => {
  let user;
  let order;
  let business;

  beforeAll(async () => {
    business = await businessFactory({
      slug: "http://localhost:3000",
    });
    const customer = await userFactory();
    user = await userFactory();
    await userBusinessFactory({
      userId: user.id,
      businessId: business.id,
      type: UserBusinessType.MESSENGER,
    });
    order = await orderFactory({
      userId: customer.id,
      status: OrderStatus.SEND,
      identifier: "user1_1",
      businessId: business.id,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("setMessengerToOrder", async () => {
    const entity = await setMessengerToOrder(business.id, order.id, user.id);
    expect(entity.messengerId).toBe(user.id);
  });
});
