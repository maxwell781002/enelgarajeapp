import { describe, vi, beforeAll, it, expect, afterAll } from "vitest";
import { businessFactory, clearBd, productFactory } from "../../factories";
import {
  addToOrder,
  decrementItem,
  getCurrentOrder,
  incrementItem,
  removeFromOrder,
} from "../../../repository/order";
import { ShopCartOrder } from "../../../types/shop-cart";

const mocksGet = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
  set: vi.fn(),
}));
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mocksGet.get,
    set: mocksGet.set,
  }),
}));

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({ value: "" })),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("shopCart", () => {
  let product1;
  let product2;
  let product3;

  beforeAll(async () => {
    const business = await businessFactory({ slug: "http://localhost:3000" });
    product1 = await productFactory({
      businessId: business.id,
      price: 50,
      offerPrice: 10,
    });
    product2 = await productFactory({
      businessId: (await businessFactory({ slug: "http://localhost:3002" })).id,
      price: 20,
    });
    product3 = await productFactory({
      businessId: business.id,
      price: 20,
    });
  });

  afterAll(async () => {
    vi.clearAllMocks();
    await clearBd();
  });

  it("no order", async () => {
    const order = await getCurrentOrder();
    expect(order).toBeNull();
  });

  it("add product", async () => {
    const order = (await addToOrder(product1.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    mocksGet.get.mockReturnValue({ value: order.id });
    expect(order.items).toHaveLength(1);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(1);
    expect(order.items[0].position).toBe(1);
    expect(order.items[0].price).toBe(10);
    expect(order.productsDetails).toHaveLength(1);
    expect((order.productsDetails as Array<any>)[0]).toEqual(product1);
    expect((await getCurrentOrder())?.total).toBe(10);
  });

  it("decrement quantity", async () => {
    const order = await decrementItem(product1.id);
    expect(order).toBeUndefined();
    const order2 = (await getCurrentOrder()) as ShopCartOrder;
    expect(order2.items).toHaveLength(1);
    expect(order2.items[0].productId).toBe(product1.id);
    expect(order2.items[0].quantity).toBe(1);
    expect(order2.items[0].position).toBe(1);
    expect(order2.items[0].price).toBe(10);
    expect(order2.total).toBe(10);
  });

  it("add another product", async () => {
    const order = (await addToOrder(product2.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[1].productId).toBe(product2.id);
    expect(order.items[1].quantity).toBe(1);
    expect(order.items[1].position).toBe(2);
    expect(order.items[1].price).toBe(20);
    expect(order.productsDetails).toHaveLength(2);
    expect((order.productsDetails as Array<any>)[1]).toEqual(product2);
    expect((await getCurrentOrder())?.total).toBe(30);
  });

  it("add product again", async () => {
    const order = (await addToOrder(product1.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(2);
    expect(order.items[0].position).toBe(1);
    expect(order.productsDetails).toHaveLength(2);
    expect((order.productsDetails as Array<any>)[0]).toEqual(product1);
    expect((order.productsDetails as Array<any>)[1]).toEqual(product2);
    expect((await getCurrentOrder())?.total).toBe(40);
  });

  it("Increment product", async () => {
    const order = (await incrementItem(product1.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(3);
    expect(order.items[0].position).toBe(1);
    expect(order.productsDetails).toHaveLength(2);
    expect((order.productsDetails as Array<any>)[0]).toEqual(product1);
    expect((order.productsDetails as Array<any>)[1]).toEqual(product2);
  });

  it("decrement quantity", async () => {
    const order = (await decrementItem(product1.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(2);
    expect(order.items[0].position).toBe(1);
  });

  it("Remove product", async () => {
    const order = (await removeFromOrder(product1.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(1);
    expect(order.items[0].productId).toBe(product2.id);
    expect(order.items[0].quantity).toBe(1);
    expect(order.items[0].position).toBe(2);
    expect(order.productsDetails).toHaveLength(1);
    expect((order.productsDetails as Array<any>)[0]).toEqual(product2);
  });
});
