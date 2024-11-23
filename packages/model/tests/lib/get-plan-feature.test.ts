import { describe, it, expect } from "vitest";
import { CompleteBusiness } from "../../prisma/zod";
import { getPlanFeature } from "../../lib/plans-feature";
import {
  CAN_CREATE_CATEGORY,
  INFINITE_NUMBER,
  NUMBER_BUSINESS_USER,
  NUMBER_OF_PRODUCTS,
  TFeatureKey,
} from "../../configs/plans";

describe("getPlanFeature", () => {
  it.each([
    [CAN_CREATE_CATEGORY, "BASIC", false],
    [CAN_CREATE_CATEGORY, "ENTERPRISE", true],
    [NUMBER_BUSINESS_USER, "BASIC", 0],
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
