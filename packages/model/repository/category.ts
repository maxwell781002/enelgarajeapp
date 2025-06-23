import { INFINITE_NUMBER, NUMBER_OF_CATEGORY } from "../configs/plans";
import { getPlanFeature } from "../lib/plans-feature";
import { CompleteBusiness } from "../prisma/zod";
import { categoryRepository } from "../repositories/category";

export const isCategoryLimited = async (business: CompleteBusiness) => {
  const featureValue = getPlanFeature<number>(NUMBER_OF_CATEGORY, business);
  if (featureValue === INFINITE_NUMBER) {
    return false;
  }
  const total = await categoryRepository.countByBusinessId(business.id);
  return total >= featureValue;
};

export const allCategories = (businessId: string) => {
  return categoryRepository.getAll(businessId);
};
