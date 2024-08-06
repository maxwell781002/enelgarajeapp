import { cookies } from "next/headers";
import prisma from "../prisma/prisma-client";

export const getCurrentUser = async () => {
  const userId = cookies().get("user_id")?.value;
  if (!userId) {
    return null;
  }
  return prisma.user.findUnique({ where: { id: userId } });
};

export const getOrCreateUser = async () => {
  const userId = cookies().get("user_id")?.value;
  if (userId) {
    return prisma.user.findUnique({ where: { id: userId } });
  }
  const user = await prisma.user.create({ data: {} });
  cookies().set("user_id", user.id);
  return user;
};
