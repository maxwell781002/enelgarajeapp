import prisma from "../prisma/prisma-client";

export const getBySlug = (slug: string) => {
  return prisma.plate.findUnique({ where: { slug } });
};

export const getById = (id: string) => {
  return prisma.plate.findUnique({ where: { id } });
};
