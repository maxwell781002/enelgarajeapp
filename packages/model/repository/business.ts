import { z } from "zod";
import { BusinessModel } from "../prisma/zod";
import { getCurrentUser } from "./user";
import { businessRepository } from "../repositories/business";

export const getBySlug = (
  slug: string,
): Promise<z.infer<typeof BusinessModel> | null> => {
  return businessRepository.getBySlug(slug);
};

export const getByUser = async () => {
  const user = await getCurrentUser();
  return user ? businessRepository.getByUser(user.id) : [];
};
