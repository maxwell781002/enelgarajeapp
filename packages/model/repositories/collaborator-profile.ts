import { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CompleteCollaboratorProfile,
  CollaboratorProfileModel,
} from "../prisma/zod/collaboratorprofile";

export class CollaboratorProfileRepository extends BaseRepository<
  CompleteCollaboratorProfile,
  typeof Prisma.collaboratorProfile
> {
  constructor() {
    super(CollaboratorProfileModel.omit({ id: true }), "collaboratorProfile");
  }

  async updateProfile(collaboratorId: string, businessId: string, data: any) {
    const profile = await this.model.findFirst({
      where: { businessId, collaboratorId },
    });
    if (profile) {
      return this.model.update({
        where: { id: profile.id },
        data,
      });
    }
    return this.model.create({
      data: {
        collaboratorId,
        businessId,
        ...data,
      },
    });
  }
}

export const collaboratorProfileRepository =
  new CollaboratorProfileRepository();
