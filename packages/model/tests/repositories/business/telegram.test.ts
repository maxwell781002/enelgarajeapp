import { afterAll, describe, expect, it } from "vitest";
import { clearBd } from "../../factories";
import { businessRepository } from "../../../repositories/business";

describe("business", () => {
  let business;

  afterAll(async () => {
    await clearBd();
  });

  it("Create without telegram", async () => {
    business = await businessRepository.create({
      name: "Business",
      slug: "http://localhost:3000",
    });
    expect(business).toBeDefined();
  });

  it("Create telegram", async () => {
    const data = {
      groupId: "123",
      invitationLink: "http://localhost:3000",
    };
    business = await businessRepository.create({
      name: "Business",
      telegram: data,
    });
    const telegram = await businessRepository.getTelegram(business.id);
    expect(telegram?.groupId).toEqual(data.groupId);
    expect(telegram?.invitationLink).toEqual(data.invitationLink);
    expect(telegram?.businessId).toEqual(business.id);
  });

  it("Update telegram", async () => {
    const data = {
      groupId: "456",
      invitationLink: "http://localhost:4000",
    };
    business = await businessRepository.update(business.id, {
      name: "Business",
      telegram: data,
    });
    const telegram = await businessRepository.getTelegram(business.id);
    expect(telegram?.groupId).toEqual(data.groupId);
    expect(telegram?.invitationLink).toEqual(data.invitationLink);
    expect(telegram?.businessId).toEqual(business.id);
  });
});
