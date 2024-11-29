"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth, SecurityUser } from "../lib/auth";
import { userRepository } from "../repositories/user";
import { businessRepository } from "@repo/model/repositories/business";

export const getCurrentUser = async (): Promise<SecurityUser> => {
  const session = await auth();
  return session?.user;
};

export const isCurrentUserCollaborator = async (
  businessId: string,
  refreshDb = false,
) => {
  const user = await getCurrentUser();
  let businessCollaboratorIds = user?.businessCollaboratorIds;
  if (refreshDb && user) {
    businessCollaboratorIds =
      await businessRepository.getBusinessIdByUserCollaborator(user.id);
  }
  return !!businessCollaboratorIds?.includes(businessId);
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
