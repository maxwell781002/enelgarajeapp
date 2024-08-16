import { describe, vi, beforeAll, it, expect, afterAll } from "vitest";
import { clearBd, productFactory } from "../../factories";
import {
  addToOrder,
  decrementItem,
  getCurrentOrder,
  incrementItem,
  removeFromOrder,
  ShopCartOrder,
} from "../../../repository/order";

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

describe("shopCart", () => {
  let product1;
  let product2;

  beforeAll(async () => {
    product1 = await productFactory();
    product2 = await productFactory();
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
    const order = await addToOrder(product1.id);
    expect(order).not.toBeNull();
    mocksGet.get.mockReturnValue({ value: order.id });
    expect(order.items).toHaveLength(1);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(1);
    expect(order.items[0].position).toBe(1);
    const productsDetails = JSON.parse(order.productsDetails as string);
    expect(productsDetails).toHaveLength(1);
    expect(productsDetails[0]).toEqual(product1);
  });

  it("decrement quantity", async () => {
    const order = await decrementItem(product1.id);
    expect(order).toBeUndefined();
    const order2 = (await getCurrentOrder()) as ShopCartOrder;
    expect(order2.items).toHaveLength(1);
    expect(order2.items[0].productId).toBe(product1.id);
    expect(order2.items[0].quantity).toBe(1);
    expect(order2.items[0].position).toBe(1);
  });

  it("add another product", async () => {
    const order = await addToOrder(product2.id);
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[1].productId).toBe(product2.id);
    expect(order.items[1].quantity).toBe(1);
    expect(order.items[1].position).toBe(2);
    const productsDetails = JSON.parse(order.productsDetails as string);
    expect(productsDetails).toHaveLength(2);
    expect(productsDetails[1]).toEqual(product2);
  });

  it("add product again", async () => {
    const order = await addToOrder(product1.id);
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(2);
    expect(order.items[0].position).toBe(1);
    const productsDetails = JSON.parse(order.productsDetails as string);
    expect(productsDetails).toHaveLength(2);
    expect(productsDetails[0]).toEqual(product1);
    expect(productsDetails[1]).toEqual(product2);
  });

  it("Increment product", async () => {
    const order = (await incrementItem(product1.id)) as ShopCartOrder;
    expect(order).not.toBeNull();
    expect(order.items).toHaveLength(2);
    expect(order.items[0].productId).toBe(product1.id);
    expect(order.items[0].quantity).toBe(3);
    expect(order.items[0].position).toBe(1);
    const productsDetails = JSON.parse(order.productsDetails as string);
    expect(productsDetails).toHaveLength(2);
    expect(productsDetails[0]).toEqual(product1);
    expect(productsDetails[1]).toEqual(product2);
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
    const productsDetails = JSON.parse(order.productsDetails as string);
    expect(productsDetails).toHaveLength(1);
    expect(productsDetails[0]).toEqual(product2);
  });
});
