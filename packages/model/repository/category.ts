import prisma from "../prisma/prisma-client";

export const getBySlugBusiness = (slug: string) => {
  return prisma.category.findMany({
    where: {
      business: {
        slug,
      },
    },
    include: { products: true },
  });
};
