import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteBusiness } from "../prisma/zod";
import { BusinessValidation } from "../validation/business";
import { PaginateData } from "../types/pagination";
import { UserBusinessType } from "../prisma/generated/client";

// TODO: I am working with userBusiness using only one user.

export class BusinessRepository extends BaseRepository<
  CompleteBusiness,
  typeof Prisma.business
> {
  constructor() {
    super(BusinessValidation, Prisma.business);
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
      await prisma().userBusiness.create({
        data: {
          userId,
          businessId: business.id,
          type: UserBusinessType.OWNER,
        },
      });
    }
    return business;
  }

  async doUpdate(id: string, data: any) {
    const userId = data.userId as string;
    delete data.userId;
    if (userId) {
      await prisma().userBusiness.deleteMany({
        where: { businessId: id, type: UserBusinessType.OWNER },
      });
      await prisma().userBusiness.create({
        data: {
          userId,
          businessId: id,
          type: UserBusinessType.OWNER,
        },
      });
    }
    return super.doUpdate(id, data);
  }

  getOwner(businessId: string) {
    return prisma().userBusiness.findFirst({
      where: { businessId, type: UserBusinessType.OWNER },
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

  getAllBusinessData(id: string) {
    return this.model.findUnique({
      where: { id },
      include: { telegram: true, defaultPaymentMethod: true },
    });
  }

  //UserBusiness
  async getBusinessIdByUserId(
    userId: string,
    type: UserBusinessType | null = null,
  ) {
    if (!userId) {
      return [];
    }
    let where: any = {
      userId,
      business: { active: true },
    };
    if (type) {
      where = {
        ...where,
        type,
      };
    }
    return (
      await prisma().userBusiness.findMany({
        where,
        select: { businessId: true },
      })
    ).map(({ businessId }) => businessId);
  }

  async getBusinessIdByUserOwner(userId: string) {
    return this.getBusinessIdByUserId(userId, UserBusinessType.OWNER);
  }

  async getBusinessIdByUserCollaborator(userId: string) {
    return this.getBusinessIdByUserId(userId, UserBusinessType.COLLABORATOR);
  }

  createCollaborator(userId: string, businessId: string) {
    return prisma().userBusiness.create({
      data: {
        userId,
        businessId,
        type: UserBusinessType.COLLABORATOR,
      },
    });
  }
}

export const businessRepository = new BusinessRepository();
