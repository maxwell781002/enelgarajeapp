import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteInvitationLink, InvitationLinkModel } from "../prisma/zod";

export class InvitationLinkRepository extends BaseRepository<
  CompleteInvitationLink,
  typeof Prisma.invitationLink
> {
  constructor() {
    super(InvitationLinkModel.omit({ id: true }), Prisma.invitationLink);
  }

  createNewLink(businessId: string) {
    const code = Math.random().toString(36).substring(2, 9);
    return this.model.create({
      data: {
        businessId,
        code,
      },
    });
  }

  async findByCode(code: string) {
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
