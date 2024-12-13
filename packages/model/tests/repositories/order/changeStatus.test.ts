import { beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, orderFactory } from "../../factories";
import { OrderStatus } from "../../../prisma/generated/client";
import { orderRepository } from "../../../repositories/order";

const module = vi.hoisted(() => ({
  updateCollaboratorProfileListener: vi.fn(),
}));
vi.mock("../../../listeners/update-order", () => ({
  updateCollaboratorProfileListener: module.updateCollaboratorProfileListener,
}));

describe("updateCollaboratorProfileListener", () => {
  let order;
  beforeAll(async () => {
    const business = await businessFactory();
    order = await orderFactory({
      businessId: business.id,
      status: OrderStatus.SEND,
    });
  });

  it("Bad new status", async () => {
    try {
      await orderRepository.changeStatus(order.id, OrderStatus.CREATED);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(module.updateCollaboratorProfileListener).not.toBeCalled();
    }
  });

  it("Good new status", async () => {
    await orderRepository.changeStatus(order.id, OrderStatus.PAYED);
    expect(module.updateCollaboratorProfileListener).toBeCalled();
  });
});
