import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  productFactory,
  productOrderFactory,
} from "../../factories";
import { OrderStatus } from "../../../prisma/generated/client";
import { orderRepository } from "../../../repositories/order";
import { productRepository } from "../../../repositories/product";

const module = vi.hoisted(() => ({
  updateCollaboratorProfileListener: vi.fn(),
}));
vi.mock("../../../listeners/update-order", () => ({
  updateCollaboratorProfileListener: module.updateCollaboratorProfileListener,
}));

describe("updateCollaboratorProfileListener", () => {
  let order1;
  let order2;
  let product1;
  let product2;
  beforeAll(async () => {
    const business = await businessFactory();
    product1 = await productFactory({
      businessId: business.id,
      stock: 0,
      isExhaustible: true,
    });
    product2 = await productFactory({
      businessId: business.id,
      stock: 0,
      isExhaustible: true,
    });
    order1 = await orderFactory({
      businessId: business.id,
      status: OrderStatus.SEND,
    });
    order2 = await orderFactory({
      businessId: business.id,
      status: OrderStatus.SEND,
    });
    await productOrderFactory({
      orderId: order2.id,
      productId: product1.id,
      quantity: 50,
      price: 100,
    });
    await productOrderFactory({
      orderId: order2.id,
      productId: product2.id,
      quantity: 60,
      price: 100,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("Bad new status", async () => {
    try {
      await orderRepository.changeStatus(order1.id, OrderStatus.CREATED);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(module.updateCollaboratorProfileListener).not.toBeCalled();
    }
  });

  it("Rejected", async () => {
    await orderRepository.changeStatus(order2.id, OrderStatus.REJECTED);
    expect(module.updateCollaboratorProfileListener).not.toBeCalled();
    const entity1 = await productRepository.get(product1.id);
    const entity2 = await productRepository.get(product2.id);
    expect(entity1.stock).toBe(50);
    expect(entity2.stock).toBe(60);
  });

  it("Payed", async () => {
    await orderRepository.changeStatus(order1.id, OrderStatus.PAYED);
    expect(module.updateCollaboratorProfileListener).toBeCalled();
  });
});
