"use server";

import { auth, SecurityUser } from "@repo/model/lib/auth";
import { userRepository } from "@repo/model/repositories/user";
import { businessRepository } from "@repo/model/repositories/business";
import { TUserBusinessType } from "@repo/model/types/enums";
import { CompleteBusiness } from "../prisma/zod";
import { INFINITE_NUMBER, NUMBER_BUSINESS_USER } from "../configs/plans";
import { getPlanFeature } from "../lib/plans-feature";

export const getCurrentUser = async (): Promise<SecurityUser> => {
  const session = await auth();
  return session?.user;
};

export const isCurrentUserCollaborator = async (businessId: string) => {
  const user = await getCurrentUser();
  const businessCollaboratorIds = user?.businessCollaboratorIds;
  return !!businessCollaboratorIds?.includes(businessId);
};

export const getBusinessSecurity = async (
  user: SecurityUser,
  businessId: string,
  type: TUserBusinessType,
) => {
  const business =
    (await businessRepository.getByUserAndActive(user?.id, type)) || [];
  const isHasBusiness = business.some(
    ({ id }: { id: string }) => id === businessId,
  );
  if (!isHasBusiness) {
    return null;
  }
  return business;
};

export const getUserAndBusinessById = async (id: string) => {
  return userRepository.getUserWithBusinesses(id);
};

export const isUserByBusinessLimited = async (business: CompleteBusiness) => {
  const featureValue = getPlanFeature<number>(NUMBER_BUSINESS_USER, business);
  if (featureValue === INFINITE_NUMBER) {
    return false;
  }
  const total = await userRepository.countByBusinessId(business.id);
  return total >= featureValue;
};
