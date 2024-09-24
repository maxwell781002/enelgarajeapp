import { afterAll, describe, expect, it, vi } from "vitest";
import { clearBd } from "../../factories";
import { getOrCrateOrder } from "../../../repository/order";

const mocksGet = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
  set: vi.fn(() => ({ value: "" })),
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

describe("getOrCrateOrder", () => {
  let orderId;

  afterAll(async () => {
    await clearBd();
  });

  it("new order", async () => {
    const order = await getOrCrateOrder();
    expect(order).not.toBeNull();
    orderId = order.id;
    expect(mocksGet.set).toHaveBeenCalledWith("order_id", order.id);
  });

  it("get order again", async () => {
    mocksGet.get.mockReturnValue({ value: orderId });
    const order = await getOrCrateOrder();
    expect(order.id).toBe(orderId);
  });
});
