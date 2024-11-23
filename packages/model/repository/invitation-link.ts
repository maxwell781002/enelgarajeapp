import { businessRepository } from "../repositories/business";
import { invitationLinkRepository } from "../repositories/invitation-link";

export enum ErrorType {
  INVITATION_LINK_NOT_FOUND = "INVITATION_LINK_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
}

export const findInvitationLink = async (userId: string, code: string) => {
  const invitationLink = await invitationLinkRepository.findByCode(code);
  if (!invitationLink) {
    return ErrorType.INVITATION_LINK_NOT_FOUND;
  }
  const businessIds = await businessRepository.getBusinessIdByUserId(userId);
  if (businessIds.includes(invitationLink.businessId)) {
    return ErrorType.USER_ALREADY_EXISTS;
  }
  return invitationLink;
};
