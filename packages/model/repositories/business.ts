import prisma, { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import { CompleteBusiness } from "@repo/model/prisma/zod/business";
import { BusinessValidation } from "@repo/model/validation/business";
import { PaginateData as BasePaginateData } from "@repo/model/types/pagination";
import { TUserBusinessType, UserBusinessType } from "@repo/model/types/enums";

// TODO: I am working with userBusiness using only one user.

type PaginateData = {
  active?: boolean;
} & BasePaginateData;

export class BusinessRepository extends BaseRepository<
  CompleteBusiness,
  typeof Prisma.business
> {
  constructor() {
    super(BusinessValidation, "business");
  }

  paginate({ query, active, ...data }: PaginateData = {}) {
    const where: any = {};
    if (query) {
      where["name"] = {
        contains: query,
        mode: "insensitive",
      };
    }
    where["active"] = active;
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

  isUserBusiness(userId: string, businessId: string, type?: TUserBusinessType) {
    const query: any = {
      userId,
      businessId,
    };
    if (type) {
      query["type"] = type;
    }
    return prisma().userBusiness.findFirst({
      where: query,
    });
  }

  getByUserAndActive(
    userId: string,
    type: TUserBusinessType | TUserBusinessType[],
  ) {
    const types = Array.isArray(type) ? type : [type];
    return this.model.findMany({
      where: {
        active: true,
        users: {
          some: { userId, type: { in: types } },
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
      include: {
        telegram: true,
        defaultPaymentMethod: true,
        whatsappConnect: true,
      },
    });
  }

  //UserBusiness
  async getBusinessIdByUserId(
    userId: string,
    type: TUserBusinessType | null = null,
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
    ).map(({ businessId }: any) => businessId);
  }

  async getBusinessIdByUserOwner(userId: string) {
    return this.getBusinessIdByUserId(userId, UserBusinessType.OWNER);
  }

  async getBusinessIdByUserCollaborator(userId: string) {
    return this.getBusinessIdByUserId(userId, UserBusinessType.COLLABORATOR);
  }

  async getBusinessIdByUserMessenger(userId: string) {
    return this.getBusinessIdByUserId(userId, UserBusinessType.MESSENGER);
  }

  async getBusinessIdByUserOther(userId: string) {
    return [
      ...((await this.getBusinessIdByUserCollaborator(userId)) || []),
      ...((await this.getBusinessIdByUserMessenger(userId)) || []),
    ];
  }

  createCollaborator(
    userId: string,
    businessId: string,
    type: TUserBusinessType,
  ) {
    return prisma().userBusiness.create({
      data: {
        userId,
        businessId,
        type,
      },
    });
  }

  connectWhatsapp(id: string, whatsappConnectId: string) {
    return prisma().business.update({
      where: {
        id,
      },
      data: {
        whatsappConnectId,
      },
    });
  }

  disconnectWhatsapp(id: string) {
    return prisma().business.update({
      where: {
        id,
      },
      data: {
        whatsappConnectId: null,
      },
    });
  }

  async retrieveWhatsappConnect(id: string) {
    return (
      await this.model.findUnique({
        where: { id },
        include: { whatsappConnect: true },
      })
    ).whatsappConnect;
  }

  countByWhatsappConnect(whatsappConnectId: string) {
    return this.model.count({
      where: { whatsappConnectId },
    });
  }
}

export const businessRepository = new BusinessRepository();
