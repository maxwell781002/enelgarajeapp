import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteInvitationLink, InvitationLinkModel } from "../prisma/zod";
import { UserBusinessType } from "../prisma/generated/client";

export class InvitationLinkRepository extends BaseRepository<
  CompleteInvitationLink,
  typeof Prisma.invitationLink
> {
  constructor() {
    super(InvitationLinkModel.omit({ id: true }), "invitationLink");
  }

  createNewLink(businessId: string, type: UserBusinessType) {
    const code = Math.random().toString(36).substring(2, 9);
    return this.model.create({
      data: {
        businessId,
        code,
        type,
      },
    });
  }

  async findByCode(code: string): Promise<CompleteInvitationLink | null> {
    const invitationLink = await this.model.findFirst({
      where: {
        code,
      },
      include: {
        business: true,
      },
    });
    if (!invitationLink) {
      return null;
    }
    return invitationLink;
  }
}

export const invitationLinkRepository = new InvitationLinkRepository();
