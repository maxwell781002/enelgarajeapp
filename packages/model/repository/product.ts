import prisma from "../prisma/prisma-client";

export const getBySlug = (slug: string) => {
  return prisma.product.findUnique({ where: { slug } });
};

export const getById = (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};
