"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth } from "../lib/auth";
import { userRepository } from "../repositories/user";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
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
