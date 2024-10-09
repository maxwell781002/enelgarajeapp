import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { businessFactory, categoryFactory, clearBd } from "../../factories";
import { categoryRepository } from "../../../repositories/category";

describe("priority", () => {
  let business;

  beforeAll(async () => {
    business = await businessFactory({ slug: "http://localhost:3000" });
    await categoryFactory({
      businessId: business.id,
      name: "category 1",
      priority: 100,
    });
    await categoryFactory({
      businessId: business.id,
      name: "category 2",
      priority: 20,
    });
    await categoryFactory({
      businessId: business.id,
      name: "category 3",
      priority: 200,
      active: false,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const categories = await categoryRepository.getAll(business.id);
    expect(categories).toHaveLength(2);
    expect(categories[0].priority).toBe(100);
    expect(categories[1].priority).toBe(20);
  });
});
