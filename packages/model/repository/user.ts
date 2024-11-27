"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth, SecurityUser } from "../lib/auth";
import { userRepository } from "../repositories/user";
import { CompleteBusiness } from "../prisma/zod";

export const getCurrentUser = async (): Promise<SecurityUser | null> => {
  const session = await auth();
  return session?.user;
};

export const isCurrentUserCollaborator = async (business: CompleteBusiness) => {
  const user = await getCurrentUser();
  return !!user?.businessCollaboratorIds?.includes(business.id);
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
