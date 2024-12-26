"use server";

import { auth, SecurityUser } from "@repo/model/lib/auth";
import { userRepository } from "@repo/model/repositories/user";
import { businessRepository } from "@repo/model/repositories/business";
import { TUserBusinessType } from "@repo/model/types/enums";

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
