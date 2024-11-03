import { CompleteBusiness } from "../prisma/zod/business";
import { getPlanFeature } from "../lib/plans-feature";
import { INFINITE_NUMBER, NUMBER_OF_CARD_NUMBERS } from "../configs/plans";
import { paymentMethodRepository } from "../repositories/payment-method";

export const isPaymentMethodLimited = async (business: CompleteBusiness) => {
  const featureValue = getPlanFeature<number>(NUMBER_OF_CARD_NUMBERS, business);
  if (featureValue === INFINITE_NUMBER) {
    return false;
  }
  const total = await paymentMethodRepository.countByBusiness(business.id);
  return total >= featureValue;
};
