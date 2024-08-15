"use server";

import { cookies } from "next/headers";
import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";

export const USER_ID_COOKIES = "user_id";

export const getCurrentUser = async () => {
  const userId = cookies().get(USER_ID_COOKIES)?.value;
  if (!userId) {
    return null;
  }
  return prisma.user.findUnique({ where: { id: userId } });
};

export const getOrCreateUser = async () => {
  let user = await getCurrentUser();
  if (user) {
    return user;
  }
  user = await prisma.user.create({ data: {} });
  cookies().set(USER_ID_COOKIES, user.id);
  return user;
};

export const updateUser = async (id: string, data: any) => {
  UserRegisterSchema.parse(data);
  return prisma.user.update({
    where: { id },
    data,
  });
};
