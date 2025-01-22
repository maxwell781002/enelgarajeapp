import { describe, it, expect } from "vitest";
import { CompleteBusiness } from "../../prisma/zod";
import { getPlanFeature } from "../../lib/plans-feature";
import {
  NUMBER_OF_CATEGORY,
  INFINITE_NUMBER,
  NUMBER_BUSINESS_USER,
  NUMBER_OF_PRODUCTS,
  TFeatureKey,
} from "../../configs/plans";

describe("getPlanFeature", () => {
  it.each([
    [NUMBER_OF_CATEGORY, "BASIC", 2],
    [NUMBER_OF_CATEGORY, "ENTERPRISE", INFINITE_NUMBER],
    [NUMBER_BUSINESS_USER, "BASIC", 1],
    [NUMBER_BUSINESS_USER, "ENTERPRISE", INFINITE_NUMBER],
    [NUMBER_OF_PRODUCTS, "BASIC", 10],
    [NUMBER_OF_PRODUCTS, "ENTERPRISE", INFINITE_NUMBER],
  ])("check feature", (name, plan, valueExpected) => {
    const value = getPlanFeature(
      name as TFeatureKey,
      { plan } as CompleteBusiness,
    );
    expect(value).toBe(valueExpected);
  });
});
