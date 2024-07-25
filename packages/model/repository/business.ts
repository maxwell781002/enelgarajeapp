import prisma from "../prisma/prisma-client";

export const getBySlug = (slug: string) => {
  return prisma.business.findUnique({ where: { slug } });
};
