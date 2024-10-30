import { afterAll, describe, expect, it } from "vitest";
import { clearBd } from "../../factories";
import { createOrUpdateBusiness } from "../../../repository/business";
import { telegramBusinessRepository } from "../../../repositories/telegram-business";
import { BusinessPlan } from "../../../prisma/generated/client";

describe("business", () => {
  let business;

  afterAll(async () => {
    await clearBd();
  });

  it("Create without telegram", async () => {
    business = await createOrUpdateBusiness({
      name: "Business",
      slug: "http://localhost:3000",
      plan: BusinessPlan.BASIC,
      sendOrderToWhatsapp: false,
    });
    expect(business).toBeDefined();
  });

  it("Create telegram", async () => {
    const data = {
      groupId: "123",
      invitationLink: "http://localhost:3000",
    };
    business = await createOrUpdateBusiness({
      name: "Business",
      telegram: data,
      plan: BusinessPlan.BASIC,
      sendOrderToWhatsapp: false,
    });
    const telegram = await telegramBusinessRepository.getByBusinessId(
      business.id,
    );
    expect(telegram?.groupId).toEqual(data.groupId);
    expect(telegram?.invitationLink).toEqual(data.invitationLink);
    expect(telegram?.businessId).toEqual(business.id);
  });

  it("Update telegram", async () => {
    const data = {
      groupId: "456",
      invitationLink: "http://localhost:4000",
    };
    business = await createOrUpdateBusiness(
      {
        name: "Business",
        telegram: data,
        plan: BusinessPlan.BASIC,
        sendOrderToWhatsapp: false,
      },
      business.id,
    );
    const telegram = await telegramBusinessRepository.getByBusinessId(
      business.id,
    );
    expect(telegram?.groupId).toEqual(data.groupId);
    expect(telegram?.invitationLink).toEqual(data.invitationLink);
    expect(telegram?.businessId).toEqual(business.id);
  });

  it("Remove telegram", async () => {
    business = await createOrUpdateBusiness(
      {
        name: "Business",
        plan: BusinessPlan.BASIC,
        sendOrderToWhatsapp: false,
      },
      business.id,
    );
    const telegram = await telegramBusinessRepository.getByBusinessId(
      business.id,
    );
    expect(telegram).toBeNull();
  });
});
