import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { businessRepository } from "../../../repositories/business";
import { UserBusinessType } from "../../../prisma/generated/client";

describe("priority", () => {
  let business;
  let businessCollaborator;
  let businessInactive;
  let user;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory({ slug: "http://localhost:3000" });
    businessInactive = await businessFactory({
      slug: "http://localhost:2000",
      active: false,
    });
    businessCollaborator = await businessFactory({
      slug: "http://localhost:4000",
    });
    await userBusinessFactory({ userId: user.id, businessId: business.id });
    await userBusinessFactory({
      userId: user.id,
      businessId: businessInactive.id,
    });
    await userBusinessFactory({
      userId: user.id,
      businessId: businessCollaborator.id,
      type: UserBusinessType.COLLABORATOR,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("business by user", async () => {
    const data = await businessRepository.getByUserAndActive(
      user.id,
      UserBusinessType.OWNER,
    );
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual(business.id);
  });

  it("business collaborator by user", async () => {
    const data = await businessRepository.getByUserAndActive(
      user.id,
      UserBusinessType.COLLABORATOR,
    );
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual(businessCollaborator.id);
  });
});
