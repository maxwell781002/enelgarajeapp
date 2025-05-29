import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import { CompleteUser, UserModel } from "../prisma/zod";
import {
  UserRoles as BaseUserRoles,
  CollaboratorProfile,
  UserBusiness,
  UserBusinessType,
} from "../prisma/generated/client";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { UserWithCollaboratorProfile } from "../types/user";
import { generateCode } from "../lib/utils";

export const UserRoles = BaseUserRoles;

type PaginateData = {
  businessId?: string;
  hasDoubts?: boolean;
} & BasePaginateData;

export class UserRepository extends BaseRepository<
  CompleteUser,
  typeof Prisma.user
> {
  constructor() {
    super(UserModel.omit({ id: true }), "user");
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

  addCollaboratorProfile(
    user: Omit<UserWithCollaboratorProfile, "_collaboratorProfile">,
  ) {
    (user as UserWithCollaboratorProfile)._collaboratorProfile =
      user.collaboratorProfiles?.[0] ||
      ({
        historicalProfit: 0,
        totalPendingInvoiceToConfirm: 0,
        totalOrderForPayment: 0,
        totalBusinessProfit: 0,
      } as CollaboratorProfile);
    return user as UserWithCollaboratorProfile;
  }

  addUserType(user: UserWithCollaboratorProfile) {
    user._userType = user.business?.[0]?.type;
    return user;
  }

  basePaginate({ query, where, ...data }: PaginateData) {
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

  async getUsers({ businessId, query, hasDoubts, ...rest }: PaginateData = {}) {
    const where: any = {
      business: {
        some: {
          businessId,
          type: {
            in: [UserBusinessType.COLLABORATOR, UserBusinessType.MESSENGER],
          },
        },
      },
    };
    if (hasDoubts) {
      where["collaboratorProfiles"] = {
        some: {
          totalOrderForPayment: {
            gt: 0,
          },
        },
      };
    }
    const { data, ...pagination } = await this.basePaginate({
      ...rest,
      where,
      include: {
        collaboratorProfiles: {
          where: {
            businessId,
          },
        },
        business: {
          where: {
            businessId,
          },
        },
      },
    });
    return {
      data: data.map((user: CompleteUser) =>
        this.addUserType(this.addCollaboratorProfile(user)),
      ),
      ...pagination,
    };
  }

  removeFromBusiness(userId: string, businessId: string) {
    return prisma().userBusiness.deleteMany({
      where: { userId, businessId },
    });
  }

  countByBusinessId(businessId: string) {
    return prisma().userBusiness.count({
      where: {
        businessId,
        type: UserBusinessType.COLLABORATOR,
      },
    });
  }

  async getReferredCode(userId: string, businessId: string) {
    const entity = (await prisma().userBusiness.findFirst({
      where: {
        userId,
        businessId,
      },
    })) as UserBusiness;
    if (entity.referredCode) {
      return entity.referredCode;
    }
    const referredCode = generateCode(8);
    await prisma().userBusiness.update({
      where: { userId_businessId: { userId, businessId } },
      data: {
        userId,
        businessId,
        referredCode,
      },
    });
    return referredCode;
  }

  async getUserIdByReferredCode(referredCode: string) {
    const entity = await prisma().userBusiness.findFirst({
      where: {
        referredCode,
      },
    });
    return entity?.userId;
  }
}

export const userRepository = new UserRepository();
