import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createCollaboratorOrder } from "../../repository/checkout";
import {
  businessFactory,
  businessNeighborhoodFactory,
  clearBd,
  neighborhoodFactory,
  productFactory,
  userFactory,
} from "../factories";
import { CommissionTypes } from "../../types/enums";
import { OrderStatus } from "../../prisma/generated/client";

const mocksCookies = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
  set: vi.fn(),
  delete: vi.fn(),
}));
vi.mock("next/headers", () => ({
  headers: () => ({
    get: vi.fn(() => "http://localhost:3000"),
  }),
  cookies: () => ({
    get: mocksCookies.get,
    set: mocksCookies.set,
    delete: mocksCookies.delete,
  }),
}));

const userModule = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
}));
vi.mock("../../repository/user", () => ({
  getCurrentUser: userModule.getCurrentUser,
}));

describe("Checkout", () => {
  let business;
  let user;
  let product1;
  let product2;
  let neighborhood;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory();
    neighborhood = await neighborhoodFactory({
      name: "neighborhood1",
      city: "city1",
    });
    await businessNeighborhoodFactory({
      businessId: business.id,
      neighborhoodId: neighborhood.id,
      shipping: 100,
    });
    userModule.getCurrentUser.mockReturnValue(user);
    product1 = await productFactory({
      businessId: business.id,
      price: 50,
      priceValues: {
        create: {
          commissionValue: 10,
          commissionType: CommissionTypes.FIXED,
        },
      },
    });
    product2 = await productFactory({
      businessId: business.id,
      price: 60,
      priceValues: {
        create: {
          commissionValue: 20,
          commissionType: CommissionTypes.FIXED,
        },
      },
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("Collaborator", async () => {
    const order = await createCollaboratorOrder(business, user, {
      cartItems: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: false,
    });
    const date = new Date();
    const position = 1;
    const identifier = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
    expect(order.total).toBe(170);
    expect(order.commission).toBe(50);
    expect(order.businessProfit).toBe(120);
    expect(order.userId).toBe(user.id);
    expect(order.shipping).toBe(0);
    expect(order.hasShipping).toBe(false);
    expect(order.status).toBe(OrderStatus.SEND);
    expect(order.position).toBe(1);
    expect(order.businessId).toBe(business.id);
    expect(order.identifier).toBe(identifier);
    expect(order.isCollaborator).toBe(true);
    expect(order.currency).toBe(business.currency);
    expect(order.items).toEqual([
      {
        productId: product1.id,
        orderId: order.id,
        price: 50,
        position: 1,
        commission: 10,
        businessProfit: 40,
        quantity: 1,
      },
      {
        productId: product2.id,
        orderId: order.id,
        price: 120,
        position: 2,
        commission: 40,
        businessProfit: 80,
        quantity: 2,
      },
    ]);
  });

  it("Collaborator with domicile", async () => {
    const order = await createCollaboratorOrder(business, user, {
      cartItems: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: true,
      address: {
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhood.id,
      },
    });
    expect(order.shipping).toBe(100);
    expect(order.hasShipping).toBe(true);
    expect(order.total).toBe(270);
  });
});
