import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessUserLink,
  ErrorType,
  findInvitationLink,
} from "../../../repository/invitation-link";
import {
  businessFactory,
  clearBd,
  invitationLinkFactory,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { businessRepository } from "../../../repositories/business";
import { UserCollaborationRegisterSchema } from "../../../validation/user";
import { invitationLinkRepository } from "../../../repositories/invitation-link";

const userModule = vi.hoisted(() => ({
  updateUser: vi.fn(),
}));
vi.mock("../../../repository/user", () => ({
  updateUser: userModule.updateUser,
}));

describe("findInvitationLink", () => {
  let user;
  let userIn;
  let invitationLinkOutOfDate;
  let invitationLinkOut;
  let invitationLinkUserIn;

  beforeAll(async () => {
    user = await userFactory();
    userIn = await userFactory();
    const business = await businessFactory();
    invitationLinkOutOfDate = await invitationLinkFactory({
      code: "outOfDate",
      businessId: business.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    });
    invitationLinkOut = await invitationLinkFactory({
      code: "code",
      businessId: business.id,
    });
    invitationLinkUserIn = await invitationLinkFactory({
      code: "codeUserIn",
      businessId: business.id,
    });
    await userBusinessFactory({
      userId: userIn.id,
      businessId: business.id,
    });
  });

  afterAll(async () => {
    return clearBd();
  });

  it("no found", async () => {
    const result = await findInvitationLink(user.id, "test");
    expect(result).toBe(ErrorType.INVITATION_LINK_NOT_FOUND);
  });

  it("Out of date", async () => {
    const result = await findInvitationLink(
      user.id,
      invitationLinkOutOfDate.code,
    );
    expect(result).toBe(ErrorType.LINK_EXPIRED);
  });

  it("New user", async () => {
    const result = await findInvitationLink(user.id, invitationLinkOut.code);
    expect(result.id).toBe(invitationLinkOut.id);
  });

  it("Link user to business", async () => {
    await businessUserLink(user, invitationLinkOut.code);
    const { id, ...userData } = user;
    expect(userModule.updateUser).toBeCalledWith(
      id,
      userData,
      UserCollaborationRegisterSchema,
    );
    const businessIds =
      await businessRepository.getBusinessIdByUserCollaborator(id);
    expect(businessIds.includes(invitationLinkOut.businessId)).toBeTruthy();
  });

  it("User In", async () => {
    const result = await findInvitationLink(
      userIn.id,
      invitationLinkUserIn.code,
    );
    const entity = await invitationLinkRepository.findByCode(
      invitationLinkUserIn.code,
    );
    expect(entity).toBeNull();
    expect(result?.error).toBe(ErrorType.USER_ALREADY_EXISTS);
  });
});
