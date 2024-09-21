"use server";

import { cookies } from "next/headers";
import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth } from "../lib/auth";

const USER_ID_COOKIES = "user_id";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
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
