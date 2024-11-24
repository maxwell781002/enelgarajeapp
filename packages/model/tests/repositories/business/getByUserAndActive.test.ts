import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { businessRepository } from "../../../repositories/business";

describe("priority", () => {
  let business;
  let user;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory({ slug: "http://localhost:3000" });
    await businessFactory({ slug: "http://localhost:4000", active: false });
    await userBusinessFactory({ userId: user.id, businessId: business.id });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("business by user", async () => {
    const data = await businessRepository.getByUserAndActive(user.id);
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual(business.id);
  });
});
