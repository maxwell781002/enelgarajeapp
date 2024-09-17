import { z } from "zod";
import { BusinessModel } from "../prisma/zod";
import { getCurrentUser } from "./user";
import { businessRepository } from "../repositories/business";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const getCurrentBusiness = async () => {
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  if (!hostname) {
    return notFound();
  }
  const business = await getBySlug(hostname);
  if (!business) {
    return notFound();
  }
  return business;
};

export const getBySlug = (
  slug: string,
): Promise<z.infer<typeof BusinessModel> | null> => {
  return businessRepository.getBySlug(slug);
};

export const getByUser = async () => {
  const user = await getCurrentUser();
  return user ? businessRepository.getByUser(user.id) : [];
};
