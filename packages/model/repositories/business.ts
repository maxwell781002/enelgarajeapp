import prisma from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteBusiness } from "../prisma/zod";
import { BusinessValidation } from "../validation/business";
import { PaginateData } from "../types/pagination";

// TODO: I am working with userBusiness using only one user.

export class BusinessRepository extends BaseRepository<
  CompleteBusiness,
  typeof prisma.business
> {
  constructor() {
    super(BusinessValidation, prisma.business);
  }

  paginate({ query, ...data }: PaginateData = {}) {
    const where: any = {};
    if (query) {
      where["name"] = {
        contains: query,
        mode: "insensitive",
      };
    }
    return super.paginate({
      ...data,
      where,
    });
  }

  async doCreate(data: any) {
    const userId = data.userId as string;
    delete data.userId;
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

  async doUpdate(id: string, data: any) {
    const userId = data.userId as string;
    delete data.userId;
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

  getByUserAndActive(userId: string) {
    return this.model.findMany({
      where: {
        active: true,
        users: {
          some: { userId },
        },
      },
    });
  }

  getBySlug(slug: string) {
    return this.model.findUnique({ where: { slug } });
  }

  getBySlugAndActive(slug: string) {
    return this.model.findFirst({ where: { slug, active: true } });
  }

  async getBusinessIdByUser(userId: string) {
    return (
      await prisma.userBusiness.findMany({
        where: { userId },
        select: { businessId: true },
      })
    ).map(({ businessId }) => businessId);
  }

  getAllBusinessData(id: string) {
    return this.model.findUnique({
      where: { id },
      include: { telegram: true, defaultPaymentMethod: true },
    });
  }
}

export const businessRepository = new BusinessRepository();
