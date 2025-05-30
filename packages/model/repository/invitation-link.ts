import { businessRepository } from "../repositories/business";
import { invitationLinkRepository } from "../repositories/invitation-link";
import { UserCollaborationRegisterSchema } from "../validation/user";
import { z } from "zod";
import { transaction } from "../prisma/prisma-client";
import { userRepository } from "../repositories/user";
import { CompleteInvitationLink } from "../prisma/zod";

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
    await invitationLinkRepository.remove(invitationLink.id);
    return {
      error: ErrorType.USER_ALREADY_EXISTS,
      businessId: invitationLink.businessId,
    };
  }
  return invitationLink;
};

export const businessUserLink = async (
  user: z.infer<typeof UserCollaborationRegisterSchema> & { id: string },
  code: string,
) => {
  const { id, ...userData } = user;
  const invitationLink = await findInvitationLink(id, code);
  if (
    Object.values(ErrorType).includes(invitationLink as ErrorType) ||
    (invitationLink as any).error
  ) {
    return;
  }
  return transaction(async (tx: any) => {
    const user = await userRepository.getById(id);
    const data = { ...user, ...userData };
    await userRepository.update(id, data);
    await invitationLinkRepository.remove(
      (invitationLink as CompleteInvitationLink).id,
    );
    return businessRepository.createCollaborator(
      id,
      (invitationLink as CompleteInvitationLink).businessId,
      (invitationLink as CompleteInvitationLink).type,
    );
  });
};
