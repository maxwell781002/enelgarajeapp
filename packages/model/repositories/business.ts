import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteBusiness } from "../prisma/zod";
import { BusinessValidation } from "../validation/business";
import { z } from "zod";

export class BusinessRepository extends BaseRepository<
  CompleteBusiness,
  typeof prisma.business
> {
  constructor() {
    super(BusinessValidation, prisma.business);
  }

  async create({ userId, ...data }: z.infer<typeof BusinessValidation>) {
    this.validate("create", data as CompleteBusiness);
    const business = await this.doCreate(data as CompleteBusiness);
    if (userId) {
      await prisma.userBusiness.create({
        data: {
          userId,
          businessId: business.id,
        },
      });
    }
    return business;
  }

  getByUser(userId: string) {
    //TODO filter by user when the relation is ready
    console.log("getByUser", userId);
    return this.model.findMany({
      where: {
        users: {
          some: { userId },
        },
        // userId_businessId: {
        //   userId,
        // },
      },
    });
  }

  getBySlug(slug: string) {
    return this.model.findUnique({ where: { slug } });
  }
}

export const businessRepository = new BusinessRepository();
