import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd, productFactory } from "../../factories";
import { paginateFrontend } from "../../../repository/product";

vi.mock("../../../repository/order", () => ({
  getCurrentOrder: () => null,
  hasProduct: () => null,
}));

describe("priority", () => {
  beforeAll(async () => {
    const business = await businessFactory({ slug: "http://localhost:3000" });
    await productFactory({
      businessId: business.id,
      name: "Product 1",
      priority: 100,
    });
    await productFactory({
      businessId: business.id,
      name: "Product 2",
      priority: 20,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const products = await paginateFrontend({});
    expect(products.data[0].priority).toBe(100);
    expect(products.data[1].priority).toBe(20);
  });
});
