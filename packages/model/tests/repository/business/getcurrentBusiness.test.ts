import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd } from "../../factories";
import { getCurrentBusiness } from "../../../repository/business";
import prisma from "../../../prisma/prisma-client";

vi.mock("next/headers", () => ({
  headers: () => ({
    get: vi.fn(() => "http://localhost:3000"),
  }),
}));
vi.mock("../../../repository/user", () => ({
  getCurrentUser: vi.fn(),
}));

describe("priority", () => {
  let business;

  beforeAll(async () => {
    business = await businessFactory({ slug: "http://localhost:3000" });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("business active", async () => {
    const current = await getCurrentBusiness();
    expect(current).toEqual(business);
  });

  it("business not active", async () => {
    business.active = false;
    await prisma().business.update({
      where: { id: business.id },
      data: business,
    });
    const current = await getCurrentBusiness();
    expect(current).toBeNull();
  });
});
