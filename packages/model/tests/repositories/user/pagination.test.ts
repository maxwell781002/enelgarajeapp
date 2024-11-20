import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { userRepository } from "../../../repositories/user";
import { UserBusinessType } from "../../../prisma/generated/client";

describe("User", () => {
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
    await userBusinessFactory({
      userId: user2.id,
      businessId: business2.id,
      type: UserBusinessType.COLLABORATOR,
    });
  });

  afterAll(() => {
    return clearBd();
  });

  it("business 1", async () => {
    const { data } = await userRepository.paginate({
      businessId: business1.id,
    });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(user1.id);
  });

  it("business 2", async () => {
    const { data } = await userRepository.paginate({
      businessId: business2.id,
    });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(user2.id);
  });
});
