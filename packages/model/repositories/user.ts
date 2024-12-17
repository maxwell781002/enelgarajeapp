import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteUser, UserModel } from "../prisma/zod";
import {
  UserRoles as BaseUserRoles,
  UserBusinessType,
} from "../prisma/generated/client";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { UserWithCollaboratorProfile } from "../types/user";

export const UserRoles = BaseUserRoles;

type PaginateData = {
  businessId?: string;
} & BasePaginateData;

export class UserRepository extends BaseRepository<
  CompleteUser,
  typeof Prisma.user
> {
  constructor() {
    super(UserModel.omit({ id: true }), Prisma.user);
  }

  getAll() {
    return this.model.findMany();
  }

  getUserWithBusinesses(id: string) {
    return this.model.findUnique({
      where: { id },
      include: {
        business: true,
      },
    });
  }

  async getUserWithCollaboratorProfile(
    id: string,
    businessId: string,
  ): Promise<UserWithCollaboratorProfile> {
    const user = await this.model.findUnique({
      where: { id },
      include: {
        collaboratorProfiles: {
          where: {
            businessId,
          },
        },
      },
    });
    return this.addCollaboratorProfile(user);
  }

  addCollaboratorProfile(user: CompleteUser) {
    user._collaboratorProfile = user.collaboratorProfiles?.[0] || {
      historicalProfit: 0,
      totalPendingInvoiceToConfirm: 0,
      totalOrderForPayment: 0,
      totalBusinessProfit: 0,
    };
    return user;
  }

  basePaginate({ businessId, query, where, ...data }: BasePaginateData) {
    where = where || {};
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

  async paginateCollaborators({
    businessId,
    query,
    ...rest
  }: PaginateData = {}) {
    const where: any = {
      business: {
        some: {
          businessId,
          type: UserBusinessType.COLLABORATOR,
        },
      },
    };
    const { data, ...pagination } = await this.basePaginate({
      ...rest,
      where,
      include: {
        collaboratorProfiles: {
          where: {
            businessId,
          },
        },
      },
    });
    return {
      data: data.map((user: CompleteUser) => this.addCollaboratorProfile(user)),
      ...pagination,
    };
  }

  removeFromBusiness(userId: string, businessId: string) {
    return prisma().userBusiness.deleteMany({
      where: { userId, businessId },
    });
  }
}

export const userRepository = new UserRepository();
