import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { UserBusinessType } from "../../../types/enums";
import { orderRepository } from "../../../repositories/order";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("collaboratorPaginate", () => {
  let user1;
  let user2;
  let clientUser;
  let business;
  let order1;
  let order2;
  let order3;
  let order4;

  beforeAll(async () => {
    clientUser = await userFactory();
    user1 = await userFactory();
    business = await businessFactory({ slug: "http://localhost:3000" });
    await userBusinessFactory({
      userId: user1.id,
      businessId: business.id,
      type: UserBusinessType.COLLABORATOR,
    });
    user2 = await userFactory();
    order1 = await orderFactory({
      userId: user1.id,
      businessId: business.id,
      isCollaborator: true,
      commission: 5,
    });
    order2 = await orderFactory({
      userId: user2.id,
      businessId: business.id,
      isCollaborator: true,
      commission: 20,
    });
    order3 = await orderFactory({
      userId: clientUser.id,
      businessId: business.id,
      commission: 20,
      referredById: user1.id,
    });
    order4 = await orderFactory({
      userId: clientUser.id,
      businessId: business.id,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("Order user1", async () => {
    const orders = await orderRepository.collaboratorPaginate({
      userId: user1.id,
      businessId: business.id,
    });
    expect(orders.data.length).toEqual(2);
    expect(orders.data[0].id).toEqual(order1.id);
    expect(orders.data[1].id).toEqual(order3.id);
  });
});
