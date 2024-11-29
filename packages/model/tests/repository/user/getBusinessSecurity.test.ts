import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { UserBusinessType } from "../../../prisma/generated/client";
import { getBusinessSecurity } from "../../../repository/user";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("getBusinessSecurity", () => {
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
    const items = await getBusinessSecurity(
      user.id,
      business.id,
      UserBusinessType.OWNER,
    );
    expect(items.length).toEqual(1);
    expect(items[0].id).toEqual(business.id);
  });

  it("business collaborator by user", async () => {
    const items = await getBusinessSecurity(
      user.id,
      businessCollaborator.id,
      UserBusinessType.COLLABORATOR,
    );
    expect(items.length).toEqual(1);
    expect(items[0].id).toEqual(businessCollaborator.id);
  });

  it("business no owner", async () => {
    const items = await getBusinessSecurity(
      user.id,
      businessCollaborator.id,
      UserBusinessType.OWNER,
    );
    expect(items).toBeNull();
  });

  it("business no collaborator by user", async () => {
    const items = await getBusinessSecurity(
      user.id,
      business.id,
      UserBusinessType.COLLABORATOR,
    );
    expect(items).toBeNull();
  });

  it("business businessInactive", async () => {
    const items = await getBusinessSecurity(
      user.id,
      businessInactive.id,
      UserBusinessType.OWNER,
    );
    expect(items).toBeNull();
  });
});
