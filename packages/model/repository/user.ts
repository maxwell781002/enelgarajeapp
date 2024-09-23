"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth } from "../lib/auth";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const updateUser = async (id: string, data: any) => {
  UserRegisterSchema.parse(data);
  return prisma.user.update({
    where: { id },
    data,
  });
};
