import { businessRepository } from "../repositories/business";
import { headers } from "next/headers";

export const getCurrentBusiness = async () => {
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  return hostname ? businessRepository.getBySlugAndActive(hostname) : null;
};
