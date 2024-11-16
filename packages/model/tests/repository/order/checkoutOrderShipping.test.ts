import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { checkoutOrder, getOrCrateOrder } from "../../../repository/order";
import {
  businessFactory,
  businessNeighborhoodFactory,
  clearBd,
  neighborhoodFactory,
  productFactory,
  productOrderFactory,
  userFactory,
} from "../../factories";
import { AddressType } from "../../../validation/user";

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
  getOrCreateUser: vi.fn(),
  updateUser: vi.fn(),
}));
vi.mock("../../../repository/user", () => ({
  getCurrentUser: userModule.getCurrentUser,
  getOrCreateUser: userModule.getOrCreateUser,
  updateUser: userModule.updateUser,
}));

const sendOrderToTelegram = vi.hoisted(() => vi.fn());
vi.mock("../../../listeners/new-order", () => ({
  sendOrderToTelegram: sendOrderToTelegram,
}));

const userData = {
  name: "test",
  phone: "125",
};

describe("checkoutOrder", () => {
  let order;
  let user;
  let business;
  let neighborhoodNotConfigured;
  let neighborhoodShipping0;
  let neighborhoodShipping100;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory();
    userModule.getOrCreateUser.mockReturnValue(user);
    userModule.getCurrentUser.mockReturnValue(user);
    const product = await productFactory({
      name: "Product 1",
      businessId: business.id,
      stock: 30,
      price: 100,
      isExhaustible: false,
    });
    order = await getOrCrateOrder();
    await productOrderFactory({
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      position: 1,
      price: 100,
    });
    neighborhoodNotConfigured = await neighborhoodFactory({
      name: "neighborhood1",
      city: "city1",
    });
    neighborhoodShipping0 = await neighborhoodFactory({
      name: "neighborhood1",
      city: "city1",
    });
    neighborhoodShipping100 = await neighborhoodFactory({
      name: "neighborhood1",
      city: "city1",
    });
    await businessNeighborhoodFactory({
      businessId: business.id,
      neighborhoodId: neighborhoodShipping0.id,
      shipping: 0,
    });
    await businessNeighborhoodFactory({
      businessId: business.id,
      neighborhoodId: neighborhoodShipping100.id,
      shipping: 100,
    });
    mocksCookies.get.mockReturnValue({ value: order.id });
  });

  afterAll(async () => {
    vi.clearAllMocks();
    await clearBd();
  });

  it("checkout order without address", async () => {
    const newOrder = await checkoutOrder(userData as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.shipping).toBe(0);
    expect(newOrder.total).toBe(100);
    expect(newOrder.status).toBe("SEND");
  });

  it("checkout order without neighborhood", async () => {
    const newOrder = await checkoutOrder({
      ...userData,
      addressType: AddressType.selectAddress,
      [AddressType.selectAddress]: {
        id: "1",
        alias: "Home",
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
      },
    } as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.shipping).toBe(0);
    expect(newOrder.total).toBe(100);
    expect(newOrder.status).toBe("SEND");
  });

  it("checkout order the neighborhood is not configured", async () => {
    const newOrder = await checkoutOrder({
      ...userData,
      addressType: AddressType.selectAddress,
      [AddressType.selectAddress]: {
        id: "1",
        alias: "Home",
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhoodNotConfigured.id,
      },
    } as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.shipping).toBe(0);
    expect(newOrder.total).toBe(100);
    expect(newOrder.status).toBe("SEND");
  });

  it("checkout order Shipping 0", async () => {
    const newOrder = await checkoutOrder({
      ...userData,
      addressType: AddressType.selectAddress,
      [AddressType.selectAddress]: {
        id: "1",
        alias: "Home",
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhoodShipping0.id,
      },
    } as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.shipping).toBe(0);
    expect(newOrder.total).toBe(100);
    expect(newOrder.status).toBe("SEND");
  });

  it("checkout order Shipping 100 do not want domicile", async () => {
    const newOrder = await checkoutOrder({
      ...userData,
      addressType: AddressType.selectAddress,
      [AddressType.selectAddress]: {
        id: "1",
        alias: "Home",
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhoodShipping100.id,
      },
    } as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.shipping).toBe(0);
    expect(newOrder.total).toBe(100);
    expect(newOrder.status).toBe("SEND");
  });

  it("checkout order Shipping 100, want domicile", async () => {
    const newOrder = await checkoutOrder({
      ...userData,
      addressType: AddressType.selectAddress,
      wantDomicile: true,
      [AddressType.selectAddress]: {
        id: "1",
        alias: "Home",
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhoodShipping100.id,
      },
    } as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.shipping).toBe(100);
    expect(newOrder.total).toBe(200);
    expect(newOrder.status).toBe("SEND");
  });
});
