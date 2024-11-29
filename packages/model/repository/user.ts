"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth, SecurityUser } from "../lib/auth";
import { userRepository } from "../repositories/user";
import {
  businessRepository,
  TUserBusinessType,
} from "@repo/model/repositories/business";

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

export const updateUser = async (
  id: string,
  data: any,
  schema: any = UserRegisterSchema,
) => {
  schema.parse(data);
  return prisma().user.update({
    where: { id },
    data,
  });
};
