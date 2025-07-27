import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  collaboratorProfileFactory,
  orderFactory,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { userRepository } from "../../../repositories/user";
import { UserBusinessType } from "../../../prisma/generated/client";

describe("User", () => {
  let business1;
  let business2;
  let collaborator1;
  let collaborator2;
  let customer1;
  let customer2;
  let customer3;

  beforeAll(async () => {
    business1 = await businessFactory({ slug: "http://localhost:3001" });
    business2 = await businessFactory({ slug: "http://localhost:3002" });
    collaborator1 = await userFactory();
    collaborator2 = await userFactory();
    customer1 = await userFactory();
    customer2 = await userFactory();
    customer3 = await userFactory();
    await userBusinessFactory({
      userId: collaborator1.id,
      businessId: business1.id,
      type: UserBusinessType.COLLABORATOR,
    });
    await userBusinessFactory({
      userId: collaborator2.id,
      businessId: business2.id,
      type: UserBusinessType.COLLABORATOR,
    });
    await orderFactory({
      businessId: business1.id,
      userId: collaborator1.id,
      isCollaborator: true,
    });
    await orderFactory({
      businessId: business1.id,
      userId: collaborator1.id,
      isCollaborator: true,
    });
    await orderFactory({
      businessId: business1.id,
      userId: customer1.id,
    });
    await orderFactory({
      businessId: business2.id,
      userId: customer2.id,
    });
  });

  afterAll(() => {
    return clearBd();
  });

  it("business 1", async () => {
    const { data } = await userRepository.getCustomers({
      businessId: business1.id,
    });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(customer1.id);
  });

  it("business 2", async () => {
    const { data } = await userRepository.getCustomers({
      businessId: business2.id,
    });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(customer2.id);
  });
});
