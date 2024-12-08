import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../../../prisma/prisma-client";
import { getCurrentOrder } from "../../../repository/order";
import {
  businessFactory,
  clearBd,
  productFactory,
  productPriceFactory,
} from "../../factories";
import { ShopCartOrder } from "../../../types/shop-cart";
import { CommissionTypes } from "../../../types/enums";

const mocksGet = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
}));
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mocksGet.get,
  }),
}));
const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({ value: "" })),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("CurrentOrder", () => {
  let orderId;
  beforeEach(async () => {
    const business = await businessFactory();
    const product1 = await productFactory({
      name: "Product 1",
      businessId: business.id,
      isExhaustible: true,
      stock: 0,
    });
    await productPriceFactory({
      productId: product1.id,
      commissionValue: 5,
      commissionType: CommissionTypes.FIXED,
    });
    const product2 = await productFactory({
      name: "Product 2",
      businessId: business.id,
      isExhaustible: true,
      stock: 100,
    });
    await productPriceFactory({
      productId: product2.id,
      commissionValue: 10,
      commissionType: CommissionTypes.FIXED,
    });
    orderId = (
      await prisma().order.create({
        data: {
          productsDetails: "[]",
          items: {
            createMany: {
              data: [
                { productId: product1.id, quantity: 1, position: 1, price: 1 },
                { productId: product2.id, quantity: 10, position: 2, price: 2 },
              ],
            },
          },
        },
      })
    ).id;
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await clearBd();
  });

  it("getCurrentOrder null", async () => {
    const order = await getCurrentOrder();
    expect(order).toBeNull();
  });

  it("getCurrentOrder bat id", async () => {
    mocksGet.get.mockReturnValue({ value: "bat-id" });
    const order = await getCurrentOrder();
    expect(order?.id).toBeUndefined();
  });

  it("getCurrentOrder", async () => {
    mocksGet.get.mockReturnValue({ value: orderId });
    const order = (await getCurrentOrder()) as ShopCartOrder;
    expect(order.id).toBe(orderId);
    expect(order.numberOfItems).toBe(11);
    expect(order.total).toBe(21);
    expect(order.items.length).toBe(2);
    expect(order.items[0].total).toBe(1);
    expect(order.items[1].total).toBe(20);
    expect(order.items[0].outOfStock).toBeTruthy();
    expect(order.items[1].outOfStock).toBeFalsy();
    //TODO Remove when I add commission in the order
    expect((order.items[0] as any).commission).toBe(5);
    expect((order.items[1] as any).commission).toBe(100);
    expect(order.hasProductOutOfStock).toBeTruthy();
    expect((order as any).commission).toBe(105);
  });
});
