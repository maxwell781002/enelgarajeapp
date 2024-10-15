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

  createOrUpdateTelegram(businessId: string, data: any) {
    if (!data) return;
    const dataBusiness = {
      ...data,
      businessId,
    };
    return prisma.telegramBusiness.upsert({
      where: { businessId },
      create: dataBusiness,
      update: dataBusiness,
    });
  }

  async doCreate(data: any) {
    const userId = data.userId as string;
    delete data.userId;
    const telegram = data.telegram;
    delete data.telegram;
    const business = await super.doCreate(data);
    if (userId) {
      await prisma.userBusiness.create({
        data: {
          userId,
          businessId: business.id,
        },
      });
    }
    await this.createOrUpdateTelegram(business.id, telegram);
    return business;
  }

  async doUpdate(id: string, data: any) {
    const userId = data.userId as string;
    delete data.userId;
    const telegram = data.telegram;
    delete data.telegram;
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
    await this.createOrUpdateTelegram(id, telegram);
    return super.doUpdate(id, data);
  }

  getTelegram(businessId: string) {
    return prisma.telegramBusiness.findUnique({
      where: { businessId },
    });
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
}

export const businessRepository = new BusinessRepository();
