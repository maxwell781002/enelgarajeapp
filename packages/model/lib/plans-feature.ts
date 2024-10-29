import { PLANS, TFeatureKey } from "../configs/plans";
import { CompleteBusiness } from "../prisma/zod/business";

export const PLANS_KEYS = Object.keys(PLANS);

export const DEFAULT_PLAN = PLANS_KEYS[0];

export const getPlanFeature = <T>(
  name: TFeatureKey,
  business: CompleteBusiness,
) => {
  if (!Object.keys(PLANS[business.plan]).includes(name)) {
    throw new Error(
      `Feature ${name} is not configured for plan ${business.plan}`,
    );
  }
  return PLANS[business.plan][name] as T;
};
