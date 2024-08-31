import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { BusinessModel, CompleteBusiness } from "../prisma/zod";

export class BusinessRepository extends BaseRepository<
  CompleteBusiness,
  typeof prisma.business
> {
  constructor() {
    super(BusinessModel, prisma.business);
  }

  getByUser(userId: string) {
    //TODO filter by user when the relation is ready
    return this.model.findMany();
  }

  getBySlug(slug: string) {
    return this.model.findUnique({ where: { slug } });
  }
}

export const businessRepository = new BusinessRepository();
