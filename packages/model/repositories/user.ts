import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteUser, UserModel } from "../prisma/zod";
import {
  UserRoles as BaseUserRoles,
  UserBusinessType,
} from "../prisma/generated/client";
import { PaginateData as BasePaginateData } from "../types/pagination";

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

  paginate({ businessId, query, ...data }: PaginateData = {}) {
    const where: any = {
      business: {
        some: {
          businessId,
          type: UserBusinessType.COLLABORATOR,
        },
      },
    };
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

  removeFromBusiness(userId: string, businessId: string) {
    return prisma().userBusiness.deleteMany({
      where: { userId, businessId },
    });
  }
}

export const userRepository = new UserRepository();
