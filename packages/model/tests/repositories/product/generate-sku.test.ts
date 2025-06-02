import { describe, expect, it, beforeAll, vi, afterAll } from "vitest";
import { businessFactory, clearBd } from "../../factories";
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

describe("generateSku", () => {
  let business1;
  let business2;

  beforeAll(async () => {
    (productRepository as any).uploadImage = vi.fn().mockReturnValue("image");
    business1 = await businessFactory({ slug: "http://localhost:3001" });
    business2 = await businessFactory({ slug: "http://localhost:3002" });
    (productRepository as any).validate = vi.fn();
  });

  afterAll(async () => {
    await clearBd();
    vi.clearAllMocks();
  });

  it("should generate a sku", async () => {
    const product = await productRepository.create({
      name: "Product",
      businessId: business1.id,
      description: "Description",
      price: 100,
    });
    expect(product.sku).toBe("P-00001");
  });

  it("should generate a sku for business 1", async () => {
    const product = await productRepository.create({
      name: "Product",
      businessId: business1.id,
      description: "Description",
      price: 100,
    });
    expect(product.sku).toBe("P-00002");
  });

  it("should generate a sku for business 2", async () => {
    const product = await productRepository.create({
      name: "Product",
      businessId: business1.id,
      description: "Description",
      price: 100,
    });
    expect(product.sku).toBe("P-00003");
  });

  it("should generate a sku for business 2", async () => {
    const product = await productRepository.create({
      name: "Product",
      businessId: business2.id,
      description: "Description",
      price: 100,
    });
    expect(product.sku).toBe("P-00001");
  });
});
