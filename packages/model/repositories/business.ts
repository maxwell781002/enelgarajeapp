import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteBusiness } from "../prisma/zod";
import { BusinessValidation } from "../validation/business";

// TODO: I am working with userBusiness using only one user.

export class BusinessRepository extends BaseRepository<
  CompleteBusiness,
  typeof prisma.business
> {
  constructor() {
    super(BusinessValidation, prisma.business);
  }

  async doCreate(data: FormData) {
    const userId = data.get("userId") as string;
    data.delete("userId");
    const business = await super.doCreate(data);
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

  async doUpdate(id: string, data: FormData) {
    const userId = data.get("userId") as string;
    data.delete("userId");
    if (userId) {
      await prisma.userBusiness.deleteMany({
        where: { businessId: id },
      });
      await prisma.userBusiness.create({
        data: {
          userId,
          businessId: id,
        },
      });
    }
    return super.doUpdate(id, data);
  }

  getOwner(businessId: string) {
    return prisma.userBusiness.findFirst({
      where: { businessId },
      include: { user: true },
    });
  }

  getByUser(userId: string) {
    return this.model.findMany({
      where: {
        users: {
          some: { userId },
        },
      },
    });
  }

  getBySlug(slug: string) {
    return this.model.findUnique({ where: { slug } });
  }
}

export const businessRepository = new BusinessRepository();
