import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  collaboratorProfileFactory,
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
  let user3;
  let user4;
  let user5;

  beforeAll(async () => {
    business1 = await businessFactory({ slug: "http://localhost:3001" });
    business2 = await businessFactory({ slug: "http://localhost:3002" });
    user1 = await userFactory();
    user2 = await userFactory();
    user3 = await userFactory();
    user4 = await userFactory();
    user5 = await userFactory();
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
    await collaboratorProfileFactory({
      businessId: business2.id,
      collaboratorId: user2.id,
      totalOrderForPayment: 1,
    });
    await userBusinessFactory({
      userId: user3.id,
      businessId: business2.id,
      type: UserBusinessType.COLLABORATOR,
    });
    await collaboratorProfileFactory({
      collaboratorId: user3.id,
      businessId: business2.id,
      totalOrderForPayment: 0,
    });
    await userBusinessFactory({
      userId: user4.id,
      businessId: business2.id,
      type: UserBusinessType.COLLABORATOR,
    });
    await userBusinessFactory({
      userId: user5.id,
      businessId: business2.id,
      type: UserBusinessType.MESSENGER,
    });
  });

  afterAll(() => {
    return clearBd();
  });

  it("business 1", async () => {
    const { data } = await userRepository.getUsers({
      businessId: business1.id,
    });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(user1.id);
  });

  it("business 2", async () => {
    const { data } = await userRepository.getUsers({
      businessId: business2.id,
    });
    expect(data.length).toBe(4);
    const ids = data.map((u) => u.id);
    expect(ids).toContain(user2.id);
    expect(ids).toContain(user3.id);
    expect(ids).toContain(user4.id);
    expect(ids).toContain(user5.id);
  });

  it("business 2", async () => {
    const { data } = await userRepository.getUsers({
      businessId: business2.id,
      hasDoubts: true,
    });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(user2.id);
  });
});
