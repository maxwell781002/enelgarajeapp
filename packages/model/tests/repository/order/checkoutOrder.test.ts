import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { checkoutOrder, getOrCrateOrder } from "../../../repository/order";
import { businessFactory, clearBd, userFactory } from "../../factories";

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

describe("checkoutOrder", () => {
  let order;
  let user;
  let business;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory();
    userModule.getOrCreateUser.mockReturnValue(user);
    userModule.getCurrentUser.mockReturnValue(user);
    order = await getOrCrateOrder();
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
  });

  it("new checkout order", async () => {
    const newOrder = await checkoutOrder(userData as any);
    expect(newOrder).not.toBeNull();
    expect(newOrder.position).toBe(2);
    expect(newOrder.status).toBe("SEND");
    expect(newOrder.identifier?.split("-")[1]).toBe("2");
    expect(userModule.updateUser).toBeCalledWith(user.id, userData);
    expect(mocksCookies.delete).toBeCalledWith("order_id");
  });
});
