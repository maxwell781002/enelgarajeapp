import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { checkoutOrder, getOrCrateOrder } from "../../../repository/order";
import { clearBd, userFactory } from "../../factories";

const mocksCookies = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
  set: vi.fn(),
  delete: vi.fn(),
}));
vi.mock("next/headers", () => ({
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

const userData = {
  name: "test",
  phone: "125",
};

describe("checkoutOrder", () => {
  let order;
  let user;

  beforeAll(async () => {
    user = await userFactory();
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
    const newOrder = await checkoutOrder(userData);
    expect(newOrder).not.toBeNull();
    expect(newOrder.position).toBe(1);
    expect(userModule.updateUser).toBeCalledWith(user.id, userData);
    expect(mocksCookies.delete).toBeCalledWith("order_id");
  });
});
