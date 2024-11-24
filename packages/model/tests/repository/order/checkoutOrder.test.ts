import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { checkoutOrder, getOrCrateOrder } from "../../../repository/order";
import {
  businessFactory,
  clearBd,
  productFactory,
  productOrderFactory,
  userFactory,
} from "../../factories";
import prisma from "../../../prisma/prisma-client";
import { AddressType } from "../../../validation/user";
import { businessRepository } from "../../../repositories/business";

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

// vi.mock("../../../lib/event-emitter", async (importOriginal) => {
//   const mod: any = await importOriginal();
//   mod.dispatch = vi.fn();
//   return mod;
// });

const userData = {
  name: "test",
  phone: "125",
};

const getProductStock = async (product: any) => {
  return (
    await prisma().product.findFirst({
      where: { id: product.id },
    })
  )?.stock;
};

describe("checkoutOrder", () => {
  let order;
  let user;
  let business;
  let product1;
  let product2;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory();
    userModule.getOrCreateUser.mockReturnValue(user);
    userModule.getCurrentUser.mockReturnValue(user);
    product1 = await productFactory({
      name: "Product 1",
      businessId: business.id,
      stock: 30,
      isExhaustible: true,
    });
    product2 = await productFactory({
      name: "Product 2 ",
      businessId: business.id,
      stock: 30,
    });
    order = await getOrCrateOrder();
    await productOrderFactory({
      orderId: order.id,
      productId: product1.id,
      quantity: 10,
      position: 1,
      price: 100,
    });
    mocksCookies.get.mockReturnValue({ value: order.id });
  });

  afterAll(async () => {
    vi.clearAllMocks();
    await clearBd();
  });

  it("checkout order", async () => {
    // const eventEmitter = await import("../../../lib/event-emitter");
    const newOrder = await checkoutOrder(userData as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.position).toBe(1);
    expect(newOrder.status).toBe("SEND");
    expect(newOrder.identifier?.split("-")[1]).toBe("1");
    expect(userModule.updateUser).toBeCalledWith(user.id, userData);
    expect(mocksCookies.delete).toBeCalledWith("order_id");
    // TODO: Not it works
    // expect((eventEmitter as any).dispatch).toHaveBeenCalledOnce();
    expect(sendOrderToTelegram).toBeCalledTimes(1);
    expect(await getProductStock(product1)).toBe(20);
    expect(await getProductStock(product2)).toBe(30);
  });

  it("new checkout order", async () => {
    const newOrder = await checkoutOrder(userData as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.position).toBe(2);
    expect(newOrder.status).toBe("SEND");
    expect(newOrder.identifier?.split("-")[1]).toBe("2");
    expect(userModule.updateUser).toBeCalledWith(user.id, userData);
    expect(mocksCookies.delete).toBeCalledWith("order_id");
    const address = await prisma().orderAddress.findMany({
      where: { orderId: newOrder.id },
    });
    expect(address.length).toBe(0);
    expect(await getProductStock(product1)).toBe(10);
    expect(await getProductStock(product2)).toBe(30);
  });

  it("Send address", async () => {
    await businessRepository.update(business.id, {
      ...business,
      requestAddress: true,
    });
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
    expect(newOrder.position).toBe(3);
    expect(newOrder.status).toBe("SEND");
    expect(newOrder.identifier?.split("-")[1]).toBe("3");
    expect(userModule.updateUser).toBeCalledWith(user.id, userData);
    expect(mocksCookies.delete).toBeCalledWith("order_id");
    const address = await prisma().orderAddress.findMany({
      where: { orderId: newOrder.id },
      include: { address: true },
    });
    expect(address.length).toBe(1);
    expect(address[0].address.name).toBe("Peter Parker");
    expect(address[0].address.address).toBe("123 Main St");
    expect(address[0].address.city).toBe("city");
    expect(address[0].address.state).toBe("state");
    expect(address[0].address.reference).toBe("12345");
    expect(await getProductStock(product1)).toBe(0);
    expect(await getProductStock(product2)).toBe(30);
  });

  // it("new checkout order", async () => {
  //   try {
  //     await checkoutOrder(userData as any);
  //     expect(true).toBe(false);
  //   } catch (error) {
  //     expect(error.message).toBe("out_of_stock");
  //   }
  //   // return expect(checkoutOrder(userData as any)).rejects.toThrowError();
  // });
});
