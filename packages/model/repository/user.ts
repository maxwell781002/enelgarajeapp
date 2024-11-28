"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth, SecurityUser } from "../lib/auth";
import { userRepository } from "../repositories/user";

export const getCurrentUser = async (): Promise<SecurityUser> => {
  const session = await auth();
  return session?.user;
};

export const isCurrentUserCollaborator = async (businessId: string) => {
  const user = await getCurrentUser();
  return !!user?.businessCollaboratorIds?.includes(businessId);
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
