import { businessRepository } from "../repositories/business";
import { invitationLinkRepository } from "../repositories/invitation-link";
import { UserCollaborationRegisterSchema } from "../validation/user";
import { z } from "zod";
import { updateUser } from "./user";
import { transaction } from "../prisma/prisma-client";

export enum ErrorType {
  INVITATION_LINK_NOT_FOUND = "INVITATION_LINK_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  LINK_EXPIRED = "LINK_EXPIRED",
}

export const findInvitationLink = async (userId: string, code: string) => {
  const invitationLink = await invitationLinkRepository.findByCode(code);
  if (!invitationLink) {
    return ErrorType.INVITATION_LINK_NOT_FOUND;
  }
  const oneDay = 1000 * 60 * 60 * 24;
  const dateDiff = new Date().getTime() - invitationLink.createdAt.getTime();
  if (dateDiff > oneDay) {
    return ErrorType.LINK_EXPIRED;
  }
  const businessIds = await businessRepository.getBusinessIdByUserId(userId);
  if (businessIds.includes(invitationLink.businessId)) {
    return ErrorType.USER_ALREADY_EXISTS;
  }
  return invitationLink;
};

export const businessUserLink = async (
  user: z.infer<typeof UserCollaborationRegisterSchema> & { id: string },
  code: string,
) => {
  const { id, ...userData } = user;
  const invitationLink = await findInvitationLink(id, code);
  if (Object.values(ErrorType).includes(invitationLink)) {
    return;
  }
  return transaction(async (tx: any) => {
    await updateUser(id, userData, UserCollaborationRegisterSchema);
    await invitationLinkRepository.remove(invitationLink.id);
    return businessRepository.createCollaborator(id, invitationLink.businessId);
  });
};
