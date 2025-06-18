import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import {
  ExternalSectionModel,
  CompleteExternalSection,
} from "@repo/model/prisma/zod/externalsection";

// 5 minutes
const WINDOW_TIME = 5 * 60 * 1000;

export class ExternalSectionRepository extends BaseRepository<
  CompleteExternalSection,
  typeof Prisma.externalSection
> {
  constructor() {
    super(ExternalSectionModel.omit({ id: true }), "externalSection");
  }

  async getUserByToken(token: string) {
    const externalSection = await this.model.findFirst({
      where: {
        token,
        createdAt: {
          gte: new Date(Date.now() - WINDOW_TIME),
        },
      },
      include: {
        user: true,
      },
    });
    if (!externalSection) {
      return;
    }
    await this.remove(externalSection.id);
    return externalSection.user;
  }
}

export const externalSectionRepository = new ExternalSectionRepository();
