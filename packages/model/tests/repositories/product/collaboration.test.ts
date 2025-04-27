import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { clearBd, productFactory } from "../../factories";
import { businessFactory } from "../../factories";
import { productRepository } from "../../../repositories/product";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

vi.mock("../../../repository/order", () => ({
  getCurrentOrder: () => null,
  hasProduct: () => null,
}));

describe("ProductRepository", () => {
  beforeAll(async () => {
    const business = await businessFactory();
    await productFactory({
      businessId: business.id,
      name: "product_1",
      stock: 10,
    });
    await productFactory({
      businessId: business.id,
      name: "product_2",
      stock: 10,
      active: false,
    });
    await productFactory({
      businessId: business.id,
      name: "product_3",
      stock: 0,
      allowOrderOutOfStock: true,
    });
    await productFactory({
      businessId: business.id,
      name: "product_4",
      stock: 0,
      allowOrderOutOfStock: false,
    });
  });
  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const { data } = await productRepository.collaborationPaginate({});
    expect(data.length).toBe(2);
    const names = data.map((p) => p.name);
    expect(names).toEqual(["product_1", "product_3"]);
  });
});
