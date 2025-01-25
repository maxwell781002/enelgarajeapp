import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { UserBusinessType } from "../../../types/enums";
import { OrderStatus } from "../../../prisma/generated/client";
import { orderRepository } from "../../../repositories/order";

describe("collaboratorAndReferredPaginate", () => {
  let user1;
  let user2;
  let business;
  beforeAll(async () => {
    user1 = await userFactory();
    business = await businessFactory({ slug: "http://localhost:3000" });
    await userBusinessFactory({
      userId: user1.id,
      businessId: business.id,
      type: UserBusinessType.COLLABORATOR,
    });
    user2 = await userFactory();
    await orderFactory({
      userId: user1.id,
      businessId: business.id,
      isCollaborator: false,
      status: OrderStatus.PAYED,
      commission: 5,
    });
    await orderFactory({
      userId: user1.id,
      businessId: business.id,
      isCollaborator: true,
      status: OrderStatus.PAYED,
      commission: 20,
    });
    await orderFactory({
      userId: user2.id,
      businessId: business.id,
      status: OrderStatus.PAYED,
      referredById: user1.id,
      commission: 10,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const { data } = await orderRepository.collaboratorAndReferredPaginate({
      userId: user1.id,
      businessId: business.id,
    });
    const commissions = data.map((i) => i.commission);
    expect(commissions).toEqual([20, 10]);
  });
});
