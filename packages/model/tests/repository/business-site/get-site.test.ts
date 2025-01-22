import { describe, expect, it, vi } from "vitest";
import { businessSiteRepository } from "@repo/model/repositories/business-site";
import { getSite } from "../../../repository/business-site";
import { BusinessPlan } from "../../../prisma/generated/client";

describe("getSite", () => {
  it("no business", async () => {
    const site = await getSite(null);
    expect(site.logo).toBe("/logo.png");
  });

  it("no has plan", async () => {
    const site = await getSite({ plan: BusinessPlan.BASIC } as any);
    expect(site.logo).toBe("/logo.png");
  });

  it("not site", async () => {
    businessSiteRepository.getByBusinessId = vi.fn().mockReturnValue(null);
    const site = await getSite({ plan: BusinessPlan.ENTERPRISE } as any);
    expect(site.logo).toBe("/logo.png");
  });

  it("not configured", async () => {
    businessSiteRepository.getByBusinessId = vi.fn().mockReturnValue({});
    const site = await getSite({ plan: BusinessPlan.ENTERPRISE } as any);
    expect(site.logo).toBe("/logo.png");
  });

  it("configured", async () => {
    businessSiteRepository.getByBusinessId = vi.fn().mockReturnValue({
      logo: {
        url: "/logo-test.png",
      },
      email: "test@enelgaraje.com",
    });
    const site = await getSite({
      plan: BusinessPlan.ENTERPRISE,
      phone: "test",
    } as any);
    expect(site.logo).toBe("/logo-test.png");
    expect(site.email).toBe("test@enelgaraje.com");
    expect(site.phone).toBe("test");
  });
});
