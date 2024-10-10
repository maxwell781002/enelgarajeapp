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
