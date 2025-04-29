import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd, productFactory } from "../../factories";
import { incrementStock } from "../../../repository/product";
import { productRepository } from "../../../repositories/product";

const auth = vi.hoisted(() => ({
  auth: vi.fn(),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: auth.auth,
}));

describe("incrementStock", () => {
  let product1;
  let product2;

  beforeAll(async () => {
    const business = await businessFactory();
    product1 = await productFactory({
      businessId: business.id,
      stock: 0,
      isExhaustible: true,
    });
    product2 = await productFactory({
      businessId: business.id,
      stock: 0,
      isExhaustible: false,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    await incrementStock([
      [product1, 10],
      [product2, 15],
    ]);

    const entity1 = await productRepository.getById(product1.id);
    const entity2 = await productRepository.getById(product2.id);

    expect(entity1.stock).toBe(10);
    expect(entity2.stock).toBe(0);
  });
});
