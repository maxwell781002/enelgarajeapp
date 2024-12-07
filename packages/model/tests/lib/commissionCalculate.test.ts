import { describe, expect, it } from "vitest";
import { commissionCalculate } from "../../lib/utils";
import { CommissionTypes } from "../../types/enums";

describe("commissionCalculate", () => {
  it("percentage base 0", () => {
    const [value, base] = commissionCalculate(
      0,
      CommissionTypes.PERCENTAGE,
      10,
    );
    expect(value).toBe(0);
    expect(base).toBe(0);
  });

  it("percentage", () => {
    const [value, base] = commissionCalculate(
      100,
      CommissionTypes.PERCENTAGE,
      10,
    );
    expect(value).toBe(10);
    expect(base).toBe(90);
  });

  it("fixed", () => {
    const [value, base] = commissionCalculate(200, CommissionTypes.FIXED, 10);
    expect(value).toBe(10);
    expect(base).toBe(190);
  });
});
