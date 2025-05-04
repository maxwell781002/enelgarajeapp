import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  businessNeighborhoodFactory,
  clearBd,
  neighborhoodFactory,
  productFactory,
  userFactory,
} from "../../factories";
import { orderRepository } from "../../../repositories/order";
import {
  createCollaboratorOrder,
  updateOrderItems,
} from "../../../repository/checkout";
import { TCustomerForm } from "../../../validation/customer";
import { TCollaboratorTicketForm } from "../../../validation/collaborator-ticket";
import { Currency } from "../../../types/enums";
import { FormOfPaymentType } from "../../../prisma/generated/client";
import { productRepository } from "../../../repositories/product";
import { CompleteOrder } from "../../../prisma/zod";

const auth = vi.hoisted(() => ({
  auth: vi.fn(),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: auth.auth,
}));

const customer: TCustomerForm = {
  name: "Pepe",
  identification: "1234567890",
  phone: "5353024637",
};
const ticket: TCollaboratorTicketForm = {
  deliveryDate: new Date(),
  currency: Currency.CUP,
  formOfPayment: FormOfPaymentType.CASH,
  nota: "nota",
  acceptTerms: true,
};

describe("updateOrderItems", () => {
  let business;
  let product1;
  let product2;
  let user;
  let neighborhood;
  let address;

  beforeAll(async () => {
    business = await businessFactory();
    user = await userFactory();
    neighborhood = await neighborhoodFactory({
      name: "neighborhood1",
      city: "city1",
    });
    await businessNeighborhoodFactory({
      businessId: business.id,
      neighborhoodId: neighborhood.id,
      shipping: 100,
    });
    product1 = await productFactory({
      businessId: business.id,
      stock: 10,
      isExhaustible: true,
      price: 5,
    });
    product2 = await productFactory({
      businessId: business.id,
      stock: 10,
      isExhaustible: true,
      price: 5,
    });
    address = {
      name: "Peter Parker",
      address: "123 Main St",
      city: "city",
      state: "state",
      reference: "12345",
      neighborhoodId: neighborhood.id,
    };
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const order = await createCollaboratorOrder(business, user, {
      customer,
      ticket,
      cartItems: [
        {
          productId: product1.id,
          quantity: 8,
          customPrice: 10,
        },
        {
          productId: product2.id,
          quantity: 8,
        },
      ],
      wantDomicile: true,
      address,
    });
    const entityProp1 = await productRepository.getById(product1.id);
    expect(entityProp1.stock).toBe(2);
    const entityProp2 = await productRepository.getById(product2.id);
    expect(entityProp2.stock).toBe(2);
    const newOrder = await updateOrderItems(
      order.id,
      order.items.map((item) => ({ ...item, quantity: 6 })),
      business.id,
    );
    const entityProp1After = await productRepository.getById(product1.id);
    expect(entityProp1After.stock).toBe(4);
    const entityProp2After = await productRepository.getById(product2.id);
    expect(entityProp2After.stock).toBe(4);
    const oldOrder = (await orderRepository.getOrderByIdAndBusinessId(
      order.id,
      business.id,
    )) as CompleteOrder;
    expect(oldOrder.changedByOrderId === newOrder.id).toBe(true);
    expect(newOrder.items.length).toBe(2);
    expect(oldOrder.items.length).toBe(2);
    expect(oldOrder.userId === user.id).toBe(true);
    expect(newOrder.userId === user.id).toBe(true);
    expect(newOrder.shipping).toBe(100);
    expect(newOrder.total).toBe(190);
    expect(newOrder.commission).toBe(30);
    expect(newOrder.businessProfit).toBe(60);
    expect(newOrder.hasShipping).toBe(true);
    expect(newOrder.status).toBe(oldOrder.status);
    expect(newOrder.businessId).toBe(oldOrder.businessId);
    expect(newOrder.isCollaborator).toBe(oldOrder.isCollaborator);
    expect(newOrder.currency).toBe(oldOrder.currency);
    expect(newOrder.ticketId).toBe((oldOrder as any).ticketId);
  });
});
