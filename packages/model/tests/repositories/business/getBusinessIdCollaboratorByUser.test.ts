import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { businessRepository } from "../../../repositories/business";
import { UserBusinessType } from "../../../prisma/generated/client";

describe("getBusinessIdByUserCollaborator", () => {
  let business1;
  let business2;
  let user1;
  let user2;

  beforeAll(async () => {
    business1 = await businessFactory({ slug: "http://localhost:3001" });
    business2 = await businessFactory({ slug: "http://localhost:3002" });
    user1 = await userFactory();
    user2 = await userFactory();
    await userBusinessFactory({
      userId: user1.id,
      businessId: business1.id,
      type: UserBusinessType.COLLABORATOR,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("business by user1", async () => {
    const data = await businessRepository.getBusinessIdByUserCollaborator(
      user1.id,
    );
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(business1.id);
  });

  it("business by user2", async () => {
    const data = await businessRepository.getBusinessIdByUserCollaborator(
      user2.id,
    );
    expect(data.length).toEqual(0);
  });
});
