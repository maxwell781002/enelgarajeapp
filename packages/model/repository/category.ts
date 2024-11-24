import prisma from "../prisma/prisma-client";
import { CompleteBusiness } from "../prisma/zod";

export const getByBusiness = (business: CompleteBusiness) => {
  return prisma().category.findMany({
    where: {
      business: {
        id: business.id,
      },
    },
    include: { products: { where: { active: true } } },
  });
};
