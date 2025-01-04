import { describe, expect, it } from "vitest";
import { calculateOrderProductCommissionAndPrice } from "../../repository/shop-cart";

describe("calculateOrderProductCommissionAndPrice", () => {
  it("calculateOrderProductCommissionAndPrice hasError", () => {
    const [commission, price] = calculateOrderProductCommissionAndPrice(
      100,
      10,
      2,
      1000,
      true,
    );
    expect(commission).toBe(20);
    expect(price).toBe(200);
  });

  it("calculateOrderProductCommissionAndPrice no hasError", () => {
    const [commission, price] = calculateOrderProductCommissionAndPrice(
      100,
      10,
      2,
      1000,
      false,
    );
    expect(commission).toBe(1820);
    expect(price).toBe(2000);
  });
});
