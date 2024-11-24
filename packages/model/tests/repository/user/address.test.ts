import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd, userFactory } from "../../factories";
import { addAddressToUser } from "../../../repository/address";

describe("Address", () => {
  let business1;
  let business2;
  let user;

  beforeAll(async () => {
    business1 = await businessFactory({ slug: "http://localhost:3004" });
    business2 = await businessFactory({ slug: "http://localhost:3002" });
    user = await userFactory();
  });

  afterAll(async () => {
    await clearBd();
  });

  it("create address", async () => {
    const address1 = await addAddressToUser(user.id, business1.id, {
      alias: "Home",
      name: "Peter Parker",
      address: "123 Main St",
      city: "city",
      state: "state",
      reference: "12345",
    });
    const address2 = await addAddressToUser(user.id, business2.id, {
      alias: "Work",
      name: "John Doe",
      address: "456 Business St",
      city: "city 2",
      state: "state 2",
      reference: "12345 2",
    });
    expect(address1).toBeDefined();
    expect(address2).toBeDefined();
  });
});
