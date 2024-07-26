import { z } from "zod";
import prisma from "../prisma/prisma-client";
import { BusinessModel } from "../prisma/zod";

export const getBySlug = (
  slug: string,
): Promise<z.infer<typeof BusinessModel> | null> => {
  return prisma.business.findUnique({ where: { slug } });
};
